import {  Response } from "express";
import { UserSchema } from "../models/models";
import { CustomRequest } from "../utils/Types/Types";

export const CoverImg = async (req: CustomRequest, res: Response) => {
    try {



        const { img } = await req.body
        const user=req.User
        const userId=user._id
        await UserSchema.findByIdAndUpdate(userId, { $set: { CoverImg: img } })
        res.json({ success: true })
    } catch (e) {

        console.log(e);
        res.json({ success: false })

    }
}