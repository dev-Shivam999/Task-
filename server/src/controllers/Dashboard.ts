import {  Response } from "express";
import { ListSchema } from "../models/models";
import { CustomRequest } from "../utils/Types/Types";

export const Dashboard = async (req: CustomRequest, res: Response) => {
    try {
       const userInfo=req.User
        const date = Date.now();
      const time=  Math.ceil((userInfo.Timer - date) / (1000 * 60 * 60 * 24)) 


      if (time>0) {
        
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
                        Color:1,
                        tasks: true,
                    },
                },
            ]);
            
            
            res.status(200).json({
                success: true,
                message: "Dashboard data retrieved successfully",
                data: {
                    user: userInfo,
                    lists,
                    Time:time
                },
            });
        }else{
            res.json({success:false,message: "Time Over"});
        }
    } catch (error) {
        console.error("Error in Dashboard function:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
