import { Response } from "express";
import { ListSchema } from "../models/models";
import { CustomRequest } from "../utils/Types/Types";

export const Graph = async (req: CustomRequest, res: Response) => {
    try {
        const user = req.User;

        const userInfo = await ListSchema.aggregate([
            {
                $match: {
                    userId: user._id,
                },
            },
            {
                $lookup: {
                    from: "taskschemas", // Name of the TaskSchema collection
                    localField: "_id",
                    foreignField: "listId",
                    as: "tasks",
                },
            },
            {
                $unwind: {
                    path: "$tasks",
                    preserveNullAndEmptyArrays: true, // Keep lists even if they have no tasks
                },
            },
            {
                $lookup: {
                    from: "timerschemas", // Name of the TimerSchema collection
                    localField: "tasks._id",
                    foreignField: "TaskId",
                    as: "tasks.timers", // Embed timers under each task
                },
            },
            {
                $group: {
                    _id: "$_id", // Group back into lists
                    userId: { $first: "$userId" },
                    Color: { $first: "$Color" },
                    list: { $first: "$list" },
                    tasks: { $push: "$tasks" },
                },
            },
        ]);

        if (!userInfo || userInfo.length === 0) {
            return res.json({ success: false, message: "No lists found for the user" });
        }

        res.status(200).json({
            success: true,
            message: "Dashboard data retrieved successfully",
            data: userInfo,
        });
    } catch (error) {
        console.error("Error in Graph function:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
