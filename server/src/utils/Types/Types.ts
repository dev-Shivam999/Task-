export interface User {
    name: string;
    email: string;
    password: string;
    Color:string

}

export interface ListType {
    UserId: any;
    List: string
    Color: string
}

export interface TaskType{
    ListId: any;
    Title:string
    Color: string
}