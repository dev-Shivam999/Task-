import { Request, Response } from "express";
import { UserSC, UserSchema } from "../models/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    try {
        const user: UserSC | null = await UserSchema.findOne({ email });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const jwtToken = jwt.sign(String(user._id), "lol");

        
        return res
            .cookie("token", jwtToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: true,

                maxAge: 24 * 3600000
            })
            .status(200)
            .json({ success: true, message: "Login successful" });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ success: false, message: "An error occurred during login" });
    }
};
