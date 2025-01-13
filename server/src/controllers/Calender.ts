import {  Response } from "express";
import { ListSchema } from "../models/models";
import { CustomRequest } from "../utils/Types/Types";

export const Calendar = async (req: CustomRequest, res: Response) => {
    try {

       const userInfo= req.User
       

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
                $unwind: "$tasks", 
            },
            {
                $lookup: {
                    from: "timerschemas", 
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
