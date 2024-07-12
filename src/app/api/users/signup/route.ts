import { connectDB} from '@/db/dbConfig';
import { UserModel } from '@/model/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;
        
    const user = await UserModel.findOne({ email })
    if (user) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({ 
        message: "User created successfully",
        success: true,
        savedUser
    });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ 
            error: "An error occurred while creating the user",
            success: false,
        });
    }
}
