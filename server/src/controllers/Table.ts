import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AttachFileSchema, ListSchema, TimerSchema, UserSchema } from "../models/models";

export const Table = async (req: Request, res: Response) => {
    try {
        const cookies = req.cookies;
        const token = cookies?.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "Please log in" });
        }

        let userId;

        try {
            const decoded: any = jwt.verify(token, "lol");
            userId = decoded;
        } catch (err) {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }

        if (!userId) {
            return res.status(400).json({ success: false, message: "Invalid userId" });
        }

        const userInfo = await UserSchema.findById(userId);
        if (!userInfo) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Fetch the lists and their associated tasks
        const lists = await ListSchema.aggregate([
            {
                $match: { userId: userInfo._id },
            },
            {
                $lookup: {
                    from: "taskschemas",
                    localField: "_id",
                    foreignField: "listId",
                    as: "tasks",
                },
            },
            {
                $project: {
                    list: 1,
                    Color: 1,
                    tasks: true,
                },
            },
        ]);

        for (const list of lists) {
            for (const task of list.tasks) {
                const timerData = await TimerSchema.findOne({ TaskId: task._id });
                const attachmentData = await AttachFileSchema.findOne({ TaskId: task._id });

                task.timer = timerData || null; 
                task.attachment = attachmentData || null;
            }
        }

       
        res.status(200).json({
            success: true,
            message: "Dashboard data retrieved successfully",
            data: {
                lists,
            },
        });
    } catch (error) {
        console.error("Error in Table function:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
