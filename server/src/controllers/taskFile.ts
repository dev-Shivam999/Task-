import { Request, Response } from "express";
import { AttachFileSchema, TaskSchema } from "../models/models";

export const TaskFile = async (req: Request, res: Response) => {
    const { id, Url, name } = await req.body

    console.log(id,Url,name);
 try {

const op=await TaskSchema.findById(id);
console.log(op);



     const data = await AttachFileSchema.create({
         TaskId: id,
         FileLink: Url,
         FileName: name
     })
     console.log(data);

     res.json({ success: true })
 } catch (error) {
    console.log(error);
    res.json({ error: error})
    
 }
}