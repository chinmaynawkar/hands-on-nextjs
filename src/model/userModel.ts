import { model, Schema, Document, models } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken?: string;
  forgotPasswordExpires?: Date;
  verifyToken?: string;
  verifyTokenExpires?: Date;
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordExpires: Date,
  verifyToken: String,
  verifyTokenExpires: Date,
});

export const UserModel = models.User || model<User>("User", userSchema);
