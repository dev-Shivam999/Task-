import { Response } from "express";
import { SettingSchema, UserSchema } from "../models/models";
import { CustomRequest } from "../utils/Types/Types";

import jwt from "jsonwebtoken";
export const ShowSettings = async (req: CustomRequest, res: Response) => {
    try {

        const { Calendar,
            Dashboard,
            Graph,
            Table } = await req.body
           const UserCookie=req.cookies
                
        
                let userInfo = req.User
                
                if (UserCookie.token2!=undefined) {
                    const decoded: any = jwt.verify(UserCookie.token2, "lol");
                            //@ts-ignore
                    userInfo=await UserSchema.findById(decoded)
                   
                }

        await SettingSchema.updateOne(
            { userId: userInfo._id },
            { $set: { Calendar: Calendar, Dashboard: Dashboard, Graph: Graph, Table: Table } }
        );





        res.json({ success: true });



    } catch (e) {
        console.log(e);
        res.json({
            success: false
        });

    }

}