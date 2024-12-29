import {  Response } from "express";
import { ReferSchema } from "../models/models";
import { CustomRequest } from "../utils/Types/Types";

export const Friend = async (req: CustomRequest, res: Response) => {
    try {
        const user=req.User
      
        const data = await ReferSchema.aggregate([
            {
                $match: {
                    userId: user._id
                }
            },
            {
                $lookup: {
                    from: "referschemas", 
                    localField: "userId",
                    foreignField: "userId",
                    as: "userCodes"
                }
            },
            {
                $project:{
                    userCodes:true
                }
            }
           ,
            {
                $lookup: {
                    from: "referschemas",
                    localField: "userCodes.Code", 
                    foreignField: "Code",
                    as: "similarUsers"
                }
            },{
                $project:{
                    similarUsers:true
                }
            }
           
            
          ,  {
                $lookup: {
                    from: "userschemas",
                    localField: "similarUsers.userId",
                    foreignField: "_id",
                    as: "userNames"
                }
            }
          , {
            $project:{
                  userNames:{
                    name:1,
                    email:1,
                    _id:1,
                  }
            }
           }
           
        ]);



        res.json({ success: true, message: data,selfId:user._id });

    } catch (err) {
        console.error(err);
        res.json({ success: false, message: err });
    }
};
