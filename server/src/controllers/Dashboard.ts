import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ListSchema, UserSchema } from "../models/models";

export const Dashboard = async (req: Request, res: Response) => {
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

        if (!userId ) {
            return res.json({ success: false, message: "Invalid userId" });
        }

        const userInfo = await UserSchema.findById(userId);
        if (!userInfo) {
            return res.json({ success: false, message: "User not found" });
        }
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
