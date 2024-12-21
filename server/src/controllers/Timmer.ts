import { Request, Response } from "express";
import { TimerSchema } from "../models/models";

export const Timmer = async (req: Request, res: Response) => {
    const { id,
        GetHours,
        EndDate,
        todatDate } = await req.body
    await TimerSchema.create({
        EndTime: `${EndDate.day}/${EndDate.month}/${EndDate.year}`,
        Reminder: GetHours,
        StartTime: todatDate,
        TaskId: id
    })
    
    
    res.json({ success: true })
}