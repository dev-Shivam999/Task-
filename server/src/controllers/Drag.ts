import { Request, Response } from "express";
import { ListSchema, TaskSchema } from "../models/models"; 

export const Drag = async (req: Request, res: Response) => {
    const { ListID1, ListID2, TaskID } = req.body;

    try {
        
        const list1 = await ListSchema.findByIdAndUpdate(
            ListID1,
            { $pull: { tasks: TaskID } }, 
            { new: true }
        );

        if (!list1) {
            return res.status(404).send("List 1 not found");
        }

        
        const list2 = await ListSchema.findByIdAndUpdate(
            ListID2,
            { $push: { tasks: TaskID } }, 
            { new: true }
        );

        if (!list2) {
            return res.status(404).send("List 2 not found");
        }

        
        await TaskSchema.findByIdAndUpdate(
            TaskID,
            { $set: { listId: ListID2 } }, 
            { new: true }
        );

        return res.status(200).send("Task moved successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).send("An error occurred");
    }
};
