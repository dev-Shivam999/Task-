import mongoose, { Model } from "mongoose";
import { AttachFileType, ListType, ReferType, TaskType, TimerType, User } from "../utils/Types/Types";



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
        Color: {
            type: String,
            default: "#8d1052"
        },
        CoverImg: {
            type: String,
            default: ""
        }
        ,
        Timer: {
            type: Number,
            default: Date.now() + 15 * 24 * 60 * 60 * 1000


        }
    },
    { timestamps: true }
);

const Refer = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
        required: true,
    },
    Code: {
        type: Number,
        default: Math.floor(Math.random() * 10000)
    },
    Leader: {
        type: Boolean,
        default: false
    }
})


const List = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserSchema",
            required: true,
        },
        Color: {
            type: String,
            default: "black",
        },
        list: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);


const Setting = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
        required: true,
    },
    Dashboard: {
        type: Boolean,
        default: true
    },
    Table: {
        type: Boolean,
        default: false
    },
    Graph: {
        type: Boolean,
        default: false
    },
    Calendar: {
        type: Boolean,
        default: false
    }
})

const Task = new mongoose.Schema(
    {
        listId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ListSchema",
            required: true,
        },
        Color: {
            type: String,
            default: "#141313"
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

const Timer = new mongoose.Schema({
    TaskId: {
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

const AttachFile = new mongoose.Schema({
    TaskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaskSchema",
        required: true,
    },
    FileLink: {
        type: String,

    },
    FileName: {
        type: String
    }

})

export const UserSchema: Model<UserSC> = mongoose.model<UserSC>("UserSchema", UserLogin);
export const ListSchema: Model<ListType & mongoose.Document> = mongoose.model<ListType & mongoose.Document>("ListSchema", List);
export const TaskSchema: Model<TaskType & mongoose.Document> = mongoose.model<TaskType & mongoose.Document>("TaskSchema", Task);
export const TimerSchema: Model<TimerType & mongoose.Document> = mongoose.model<TimerType & mongoose.Document>("TimerSchema", Timer);
export const AttachFileSchema: Model<AttachFileType & mongoose.Document> = mongoose.model<AttachFileType & mongoose.Document>("AttachFileSchema", AttachFile);
export const ReferSchema: Model<ReferType & mongoose.Document> = mongoose.model<ReferType & mongoose.Document>("ReferSchema", Refer);
export const SettingSchema = mongoose.model("SettingSchema", Setting);
