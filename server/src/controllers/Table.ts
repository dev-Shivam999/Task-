import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AttachFileSchema, ListSchema, TimerSchema, UserSchema } from "../models/models";

export const Table = async (req: Request, res: Response) => {
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
       

        

            const lists = await ListSchema.aggregate([
                {
                    $match: {
                        userId: userInfo._id,
                    },
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
            
        const id = lists[0].tasks[0]._id
const data=await TimerSchema.findOne({
    TaskId:id
})
const data2=await AttachFileSchema.findOne({
    TaskId:id
})

            res.status(200).json({
                success: true,
                message: "Dashboard data retrieved successfully",
                data: {
                    lists,
                    data,data2
                },
            });
       
    } catch (error) {
        console.error("Error in Dashboard function:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
