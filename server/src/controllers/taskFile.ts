import { Request, Response } from "express";
import { AttachFileSchema } from "../models/models";

export const TaskFile = async (req: Request, res: Response) => {
    const { id, Url, name } = await req.body

  const data=  await AttachFileSchema.create({
        TaskId: id,
        FileLink: Url,
        FileName: name
    })
    console.log(data);
    
    res.json({success: true})
}