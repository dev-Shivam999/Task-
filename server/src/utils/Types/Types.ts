import { Request } from "express";
import { UserSC } from "../../models/models";

export interface User {
    name: string;
    email: string;
    password: string;
    Color: string
    Timer: number

}

export interface ListType {
    UserId: any;
    List: string
    Color: string
}

export interface TaskType {
    ListId: any;
    Title: string
    Color: string,

}
export interface TimerType {
    TaskId: string
    StartTime: string

    EndTime: string,
    Reminder: string
}
export interface AttachFileType {
    TaskId: string
    FilePath: string
}

export interface SettingType {
    userId: string

}

export interface ReferType {
    userId: string,
    Code: Number,
    Leader: Boolean
}
export interface CustomRequest extends Request {
    User: UserSC
}
