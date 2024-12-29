import { Response } from "express";

import { CustomRequest } from "../utils/Types/Types";

import jwt from "jsonwebtoken";
import { UserSchema } from "../models/models";
export const Profile = async (req: CustomRequest, res: Response) => {

    const UserCookie = req.cookies


    let userInfo = req.User

    if (UserCookie.token2 != undefined) {
        const decoded: any = jwt.verify(UserCookie.token2, "lol");
        //@ts-ignore
        userInfo = await UserSchema.findById(decoded)

    }

    res.json({ success: true, message: userInfo });



}
