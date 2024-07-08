export interface Task{
    id:number;
    name:string;
    description:string;
    userId:number;
    status?:string;
    addedDate?:Date;
}
