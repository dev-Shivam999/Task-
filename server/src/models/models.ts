import mongoose, { Model } from "mongoose";
import { AttachFileType, ListType, TaskType, TimerType, User } from "../utils/Types/Types";


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
        ,
        Timer:{
            type:Number,
            default:Date.now() + 15 * 24 * 60 * 60 * 1000
  
            
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
            default: "yellow",
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
        isDead: {
            type: Boolean,
            default: false,
        },
        isComplete: {
            type: Boolean,
            default: false,
        }

       
    },
    { timestamps: true }
);

const Timer=new mongoose.Schema({
    TaskId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaskSchema",
        required: true,
    },
    StartTime: {
        type: String,

    }, EndTime: {
        type: String,
    },
    Reminder: {
        type: String,
    }
})

const AttachFile =new mongoose.Schema({
    TaskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaskSchema",
        required: true,
    },
    FileLink: {
        type: String,

    }
})

export const UserSchema: Model<UserSC> = mongoose.model<UserSC>("UserSchema", UserLogin);
export const ListSchema: Model<ListType> = mongoose.model<ListType>("ListSchema", List);
export const TaskSchema: Model<TaskType> = mongoose.model<TaskType>("TaskSchema", Task);
export const TimerSchema: Model<TimerType> = mongoose.model<TimerType>("TimerSchema", Timer);
export const AttachFileSchema: Model<AttachFileType> = mongoose.model<AttachFileType>("AttachFileSchema", AttachFile);
