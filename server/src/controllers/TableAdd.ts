import { Response } from "express";
import { ListSchema, TaskSchema } from "../models/models";
import { CustomRequest } from "../utils/Types/Types";

export const TableAdd = async (req: CustomRequest, res: Response) => {
    try {

        const userInfo = req.User
        const { Task, List } = await req.body
        const newList = await ListSchema.create({
            userId: userInfo._id,
            list: List,
        });
        await TaskSchema.create({
            listId: newList._id,
            title: Task,
        });
        res.json({ success: true })
    } catch (err) {
        console.log(err);
        res.json({ success: false })
    }
}