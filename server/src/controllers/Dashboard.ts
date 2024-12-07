import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ListSchema, UserSchema } from "../models/models";

export const Dashboard = async (req: Request, res: Response) => {
    try {
        const cookies = req.cookies;
        const token = cookies?.token;
        

        if (!token) {
            return res.status(401).json({ success: false, message: "Please log in" });
        }


        let userId;
        
        try {
            const decoded = jwt.verify(token, "lol") 
            userId = decoded;
        } catch (err) {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }


        const userInfo = await UserSchema.findById(userId, { name: true });
        if (!userInfo) {
            return res.status(401).json({ success: false, message: "User not found" });
        }


        const lists = await ListSchema.aggregate([
            {
                $match: {
                    userId: userInfo._id,
                },
            },
            {
                $lookup: {
                    from: 'TaskSchema',
                    localField: '_id',
                    foreignField: 'listId',
                    as: 'tasks',
                },
            },
          
            {
                $project: {
                    list: 1,
                    tasks: 1,
                },
            },
        ]);

        res.status(200).json({
            success: true,
            message: "Dashboard data retrieved successfully",
            data: {
                user: userInfo,
                lists,
            },
        });
    } catch (error) {
        console.error("Error in Dashboard function:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
