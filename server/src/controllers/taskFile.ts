import { Request, Response } from "express";
import { AttachFileSchema, TaskSchema } from "../models/models";

export const TaskFile = async (req: Request, res: Response) => {
    const { id, Url, name } = await req.body

 try {



await AttachFileSchema.create({
         TaskId: id,
         FileLink: Url,
         FileName: name
     })
     res.json({ success: true })
 } catch (error) {
    console.log(error);
    res.json({ error: error})
    
 }
}