import {  Response } from "express";
import { AttachFileSchema, ListSchema, TimerSchema } from "../models/models";
import { CustomRequest } from "../utils/Types/Types";

export const Table = async (req: CustomRequest, res: Response) => {
    try {
       
        const userInfo=req.User

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
