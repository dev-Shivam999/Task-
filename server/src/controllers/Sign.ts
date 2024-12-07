import { Request, Response } from "express";
import { UserSC, UserSchema } from "../models/models";

import jwt from "jsonwebtoken";

export const Sign = async (req: Request, res: Response) => {

   try {
       const { name, email, password } = req.body
      
       

       const existing: UserSC | null = await UserSchema.findOne({ email: email })
       if (existing) {
            res.json({ success: false, message: "User already exists" }).status(401)
       }
       const user: UserSC = await UserSchema.create({ name: name, email: email, password: password })
const jwtToken =jwt.sign(String(user._id),"lol")
       res.cookie("token", jwtToken, {
           httpOnly: true,
           sameSite: "strict",
           secure: true

           
       })
           .status(200)
           .json({ success: true, message: "Login successful" });

   } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"}).status(500)
    
   }



}