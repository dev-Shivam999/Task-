import { Request, Response } from "express";
import { ReferSchema, SettingSchema, UserSC, UserSchema } from "../models/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Sign = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;


        const existing: UserSC | null = await UserSchema.findOne({ email: email });
        if (existing) {
            return res.status(401).json({ success: false, message: "User already exists" });
        } else {

            const hash = bcrypt.hashSync(password, 10);

            const user: UserSC = await UserSchema.create({ name, email, password: hash });
            await SettingSchema.create({
                userId: user?._id,
            })
           
            const jwtToken = jwt.sign(String(user._id), "lol");


            return res
                .cookie("token", jwtToken,{
                    sameSite:"none"
                })
                .status(200)
                .json({ success: true, message: "User created successfully" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Error" });
    }
};
