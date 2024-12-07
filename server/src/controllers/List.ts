import { Request, Response } from "express";
import { ListSchema } from "../models/models";

export const List = async (req: Request, res: Response) => {
    try {
        const { ListName, Id } = req.body;

    
        if (!ListName || !Id) {
             res.status(400).json({ success: false, message: "ListName and Id are required" });
        }

        console.log(Id);

    
        await ListSchema.create({
            UserId: Id,
            List: ListName
        });

    
        res.status(201).json({ success: true, message: "List created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred while creating the list", error: error });
    }
}
