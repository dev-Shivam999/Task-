import { Request, Response } from "express";
import { ReferSchema, UserSchema } from "../models/models";

import jwt from "jsonwebtoken";

export const Refer = async (req: Request, res: Response) => {
    const { Refer } = await req.body
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



  try {
    const data =  await ReferSchema.findOneAndUpdate({
  
          Code: Refer
      },{
        $set:{
            Code:Refer
        }
      })
      res.json({ success: true,message:data?"Ho gaya":"not  valid" })
  } catch (error) {
    console.log(error);
     res.json({ success: false,message:error})
    
  }

}