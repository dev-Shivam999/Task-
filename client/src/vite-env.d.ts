/// <reference types="vite/client" />


interface UserType{
    name:String;
    _id:String;
    Color:String,
    Timer: Number
    CoverImg:String
    
}

interface Task {
    _id: string;
    title: string;
}

interface List {
    list: string;
    tasks: Task[];
}

interface Time {
    TaskId: string;
    StartTime: string;
    EndTime: string;
    Reminder: string;
}
