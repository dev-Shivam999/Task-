import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ListSchema, TaskSchema, UserSchema } from "../models/models";

export const Graph = async (req: Request, res: Response) => {
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
const user=await UserSchema.findById(userId);
if (!user) {
    return res.json({ success: false, message: "Invalid userId" });

}

        const userInfo = await ListSchema.aggregate([
            {
                $match: {
                    userId: user._id,
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
                    tasks: {
                        title:1,
                        isComplete:1
                    },
                },
            },
        ]);
             if (!userInfo) {
            return res.json({ success: false, message: "User not found" });
        }








        res.status(200).json({
            success: true,
            message: "Dashboard data retrieved successfully",
            data: {
                user: userInfo,

            },
        });

    } catch (error) {
        console.error("Error in Dashboard function:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
