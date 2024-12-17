import mongoose, { Model } from "mongoose";
import { ListType, TaskType, User } from "../utils/Types/Types";


export type UserSC = User & mongoose.Document;

const UserLogin = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        Color:{
            type: String,
            default:"black"
        }
    },
    { timestamps: true }
);


const List = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserSchema",
            required: true,
        },
        Color: {
            type: String,
            default: "black"
        },
        list: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);


const Task = new mongoose.Schema(
    {
        listId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ListSchema",
            required: true,
        },
        Color: {
            type: String,
            default: "black"
        },
        title: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const UserSchema: Model<UserSC> = mongoose.model<UserSC>("UserSchema", UserLogin);
export const ListSchema: Model<ListType> = mongoose.model<ListType>("ListSchema", List);
export const TaskSchema: Model<TaskType> = mongoose.model<TaskType>("TaskSchema", Task);
