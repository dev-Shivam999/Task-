import { Response } from "express";
import {  SettingSchema, UserSchema } from "../models/models";
import { CustomRequest } from "../utils/Types/Types";

import jwt from "jsonwebtoken";

export const Dashboard1 = async (req: CustomRequest, res: Response) => {
    try {
        const UserCookie=req.cookies
        

        let userInfo = req.User
        
        if (UserCookie.token2!=undefined) {
            const decoded: any = jwt.verify(UserCookie.token2, "lol");
                    //@ts-ignore
            userInfo=await UserSchema.findById(decoded)
           
        }
        
       
        const date = Date.now();
        const time = Math.ceil((userInfo.Timer - date) / (1000 * 60 * 60 * 24))

        const Show = await SettingSchema.findOne({ userId: userInfo._id })

        if (time > 0) {

           


            res.status(200).json({
                success: true,
                message: "Dashboard data retrieved successfully",
                data: {
                    user: userInfo,
                    
                    Time: time,
                    show:Show
                },
            });
        } else {
            res.json({ success: false, message: "Time Over" });
        }
    } catch (error) {
        console.error("Error in Dashboard function:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
