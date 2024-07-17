import { connectDB } from '@/db/dbConfig';
import { UserModel } from '@/model/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        // Check if user exists 
        const user = await UserModel.findOne({ email })
        if(!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 })
        }

        // Check if password matches
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if(!isPasswordCorrect) {
            return NextResponse.json({ error: "Incorrect password" }, { status: 400 })
        }

        // Create a Token
        const tokenData = {
            id: user._id,
            username: user.username,
            isVerified: user.isVerified,
            isAdmin: user.isAdmin,
        };

        const token = jwt.sign
        (tokenData, process.env.TOKEN_SECRET as string, { expiresIn: '1h' });

        // Create a sanitized response object
        const response = NextResponse.json({ 
            message: "User logged in successfully",
            success: true,
        });
        response.cookies.set("token", token, {
             httpOnly: true 
            
        });
        return response;
        
    } catch (error) {
        console.error("Error logging in:", error);
        return NextResponse.json({ 
            error: "An error occurred while logging in",
            success: false,
        }, { status: 500 }); // Add the status code
    }
}