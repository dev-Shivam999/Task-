import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SettingSchema, UserSchema } from "../models/models";

export const ShowSettings = async (req: Request, res: Response) => {
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

        const userInfo = await UserSchema.findById(userId);

        if (!userInfo) {
            return res.json({ success: false, message: "User not found" });
        }

        const { Calendar,
            Dashboard,
            Graph,
            Table } = await req.body
        await SettingSchema.updateOne(
                { userId: userInfo._id },
                { $set: { Calendar: Calendar, Dashboard: Dashboard, Graph: Graph, Table: Table } }
            );
        console.log(Calendar,
            Dashboard,
            Graph,
            Table);
            

        

            res.json({ success: true });
     


    } catch (e) {
        console.log(e);
        res.json({
            success: false
        });

    }

}