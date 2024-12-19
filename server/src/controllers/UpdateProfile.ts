import { Request, Response } from "express";
import { UserSchema } from "../models/models";



export const UpdateProfile = async (req: Request, res: Response) => {
  try {
      const { date } = req.body
      

     await UserSchema.findByIdAndUpdate(date._id, { $set: { name: date.name, email: date.email, Color: date.Color } })


      res.json({success:true})
  } catch (error) {
    console.log(error);
    res.json({success:false, error: error})
    
  }

}