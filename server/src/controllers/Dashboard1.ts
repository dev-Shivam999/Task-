import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {  SettingSchema, UserSchema } from "../models/models";

export const Dashboard1 = async (req: Request, res: Response) => {
    try {
        const cookies = req.cookies;
        const token = cookies?.token;

        if (!token) {
            return res.json({ success: false, message: "Please log in" });
        }

        let userId;

        try {
            const decoded: any = jwt.verify(token, "lol");
            userId = decoded;

        } catch (err) {
            return res.json({ success: false, message: "Invalid or expired token" });
        }

        if (!userId) {
            return res.json({ success: false, message: "Invalid userId" });
        }

        const userInfo = await UserSchema.findById(userId);
        if (!userInfo) {
            return res.json({ success: false, message: "User not found" });
        }
        const date = Date.now();
        const time = Math.ceil((userInfo.Timer - date) / (1000 * 60 * 60 * 24))

        const Show = await SettingSchema.findOne({ userId: userId })

        if (time > 0) {

           


            res.status(200).json({
                success: true,
                message: "Dashboard data retrieved successfully",
                data: {
                    user: userInfo,
                    
                    Time: time,
                    show:Show
                },
            });
        } else {
            res.json({ success: false, message: "Time Over" });
        }
    } catch (error) {
        console.error("Error in Dashboard function:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
