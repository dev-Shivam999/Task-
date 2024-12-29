import { NextFunction, Response } from "express";
import {  UserSchema } from "../../models/models";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../Types/Types";


export const Auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
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

    const userInfo = await UserSchema.findById(userId);
    if (!userInfo) {
        return res.json({ success: false, message: "User not found" });
    }
    if (userInfo) {


          req.User = userInfo
  


        next()
    }
}