import { Request, Response } from "express";
import { ListSchema, UserSchema } from "../models/models";

export const Dashboard = async (req: Request, res: Response) => {
    try {
        const cookies = req.cookies;
        const token = cookies?.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "Please log in" });
        }

        const userInfo = await UserSchema.findById(token,{
            name:true
        })

        if (!userInfo) {
            return res.status(401).json({ success: false, message: "Invalid user or token" });
        }
        const pp = await ListSchema.find().populate('UserSchema').populate('ListSchema')


        res.status(200).json({ success: true, message: { userInfo, pp } });
    } catch (error) {
        console.error("Error in Dashboard function:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
