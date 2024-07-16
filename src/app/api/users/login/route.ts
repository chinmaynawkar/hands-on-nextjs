import { connectDB } from '@/db/dbConfig';
import { UserModel } from '@/model/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        await connectDB(); // Ensure the database connection is established

        const reqBody = await req.json();
        const { email, password } = reqBody;

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        