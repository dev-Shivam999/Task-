import { Request, Response } from "express";
import { ListSchema } from "../models/models";

export const List = async (req: Request, res: Response) => {
    try {
        const { ListName, Id } = req.body;

        
        if (!ListName || !Id) {
            res.status(400).json({
                success: false,
                message: "ListName and Id are required"
            });
        }

        

        
        const newList = await ListSchema.create({
            userId: Id,
            list: ListName,
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
};
