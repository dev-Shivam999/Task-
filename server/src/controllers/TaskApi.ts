import { Request, Response } from "express";
import mongoose from "mongoose";
import { TaskSchema } from "../models/models";

export const TaskApi = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid or missing Task ID" });
        }

        const data = await TaskSchema.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "timers",
                    localField: "_id",
                    foreignField: "TaskId",
                    as: "Timer",
                },
            },
            {
                $lookup: {
                    from: "attachFiles",
                    localField: "_id",
                    foreignField: "TaskId",
                    as: "AttachFile",
                },
            },
        ]);

        if (!data.length) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        res.json({ success: true, data });
    } catch (error) {
        console.error("Error fetching task data:", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};
