export type Id = number | string;

export type Column = {
    id: Id;
    title: string;
}

export type Task = {
    id: Id,
    columnId: Id,
    content: string
}

export type Log = {
    id: Id,
    columnId: Id,
    content: string,
    type: string,
    date: string
    taskId?: Id
    prevContent?: string
}