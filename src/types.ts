export type Id = number | string;

export type Column = {
    id: Id;
    title: string;
}

export type Task = {
    id: Id,
    columnId: Id,
    content: {
        title: string,
        desc: string,
        respon: string,
        priority: string
    }
    createdAt: string 
}

export type Log = {
    id: Id,
    columnId: Id,
    content: string,
    type: string,
    date: string,
    time: string,
    taskId?: Id,
    prevContent?: string
}

export type Option = {
    typeValue: any;
    text: string,
    class: string
}