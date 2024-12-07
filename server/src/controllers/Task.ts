import { Request, Response } from "express";
import { TaskSchema } from "../models/models";

export const Task = async (req: Request, res: Response) => {
   try {
       const { Task, Id } = req.body;


       if (!Task || !Id) {
           res.status(400).json({
               success: false,
               message: "ListName and Id are required"
           });
       }
       const newList = await TaskSchema.create({
           listId: Id,
           title: Task,
       });

       res.status(201).json({
           success: true,
           message: "List created successfully",
           data: newList
       });
   } catch (error) {
       console.error("Error creating list:", error);
       res.status(500).json({
           success: false,
           message: "An error occurred while creating the list",
       });
   }

}