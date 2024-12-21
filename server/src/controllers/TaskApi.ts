import { Request, Response } from "express";
import mongoose from "mongoose";
import {  AttachFileSchema, TimerSchema } from "../models/models";

export const TaskApi = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

       
const data=await TimerSchema.findOne({
    TaskId:id
})
const data2=await AttachFileSchema.findOne({
    TaskId:id
})

      
        res.json({ success: true, data:data,data2:data2 });
    } catch (error) {
        console.error("Error fetching task data:", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};
