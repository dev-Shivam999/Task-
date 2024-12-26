import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ListSchema, UserSchema } from "../models/models";

export const Calendar = async (req: Request, res: Response) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "Please log in" });
        }

        let userId;
        try {
            const decoded = jwt.verify(token,"lol") 
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

        const calendarData = await ListSchema.aggregate([
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
                $unwind: "$tasks", // Flatten the tasks array
            },
            {
                $lookup: {
                    from: "timerschemas", // Collection name for timers
                    localField: "tasks._id",
                    foreignField: "TaskId",
                    as: "tasks.timers",
                },
            },
            {
                $group: {
                    _id: "$_id",
                    color: { $first: "$Color" },
                    list: { $first: "$list" },
                    tasks: {
                        $push: {
                            title: "$tasks.title",
                            timers: "$tasks.timers",
                        },
                    },
                },
            },
            {
                $project: {
                    color: 1,
                    list: 1,
                    tasks: {
                        title: 1,
                        isDead: 1,
                        isComplete: 1,
                        timers: 1,
                    },
                },
            },
        ]);

        return res.json(calendarData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error", error: err });
    }
};
