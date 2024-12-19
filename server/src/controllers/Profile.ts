import { Request, Response } from "express";
import { UserSchema } from "../models/models";

import jwt from "jsonwebtoken";

export const Profile = async (req: Request, res: Response) => {

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

    const data = await UserSchema.findById(userId, { name: true, email: true, Color: true })

    res.json({ success: true, message: data });



}
