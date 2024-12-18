import { Request, Response } from "express";
import { ListSchema, TaskSchema } from "../models/models";

export const UpdateColor = async (req: Request, res: Response) => {

   try {
       const { type, Color, id } = await req.body
       if (type == "List") {
        
          await TaskSchema.findByIdAndUpdate(id, { $set: { Color: Color } })
        
           res.json({ success: true })
       } else {
           await ListSchema.findByIdAndUpdate({ _id: id }, { $set: { Color: Color } })
           res.json({ success: true })

       }
   } catch (error) {
    console.log(error);
    res.json({success:false, error: error});
    
   }
}