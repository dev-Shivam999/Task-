import {  Response } from "express";
import { ListSchema, } from "../models/models";
import { CustomRequest } from "../utils/Types/Types";

export const Graph = async (req: CustomRequest, res: Response) => {
    try {
        const user=req.User

        const userInfo = await ListSchema.aggregate([
            {
                $match: {
                    userId: user._id,
                },
            },
            
            {
                $lookup:{
                     from:"timeschemas",
                     localField:"tasks._id",
                     foreignField:"taskId",
                     as: "times",
                }
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
