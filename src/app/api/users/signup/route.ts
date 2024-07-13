import { connectDB } from '@/db/dbConfig';
import { UserModel } from '@/model/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        await connectDB(); // Ensure the database connection is established

        const reqBody = await req.json();
        const { username, email, password } = reqBody;

        // Check if user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        // Create a sanitized response object
        const sanitizedUser = {
            id: savedUser._id,
            username: savedUser.username,
            isVerified: savedUser.isVerified,
            isAdmin: savedUser.isAdmin,
        };

        console.log(sanitizedUser);

        return NextResponse.json({ 
            message: "User created successfully",
            success: true,
            user: sanitizedUser
        });

    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ 
            error: "An error occurred while creating the user",
            success: false,
        }, { status: 500 }); // Add the status code
    }
}
