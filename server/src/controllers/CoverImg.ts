import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ListSchema, UserSchema } from "../models/models";

export const CoverImg = async (req: Request, res: Response) => {
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
const {img}=await req.body
        await UserSchema.findByIdAndUpdate(userId, { $set: { CoverImg :img}})
        res.json({success:true})
    }catch (e) {

        console.log(e);
        res.json({ success: false})
        
    }}