import { Request, Response } from "express";
import { UserSC, UserSchema } from "../models/models";
import bcrypt from "bcrypt";

export const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    try {
        const user: UserSC | null = await UserSchema.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {

            res
                .cookie("token", user._id, {
                    httpOnly: true,
                    sameSite: "strict",
                    secure: true
                })
                .status(200)
                .json({ success: true, message: "Login successful" });
        }

        res.status(401).json({ success: false, message: "Invalid email or password" });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "An error occurred during login" });
    }
};
