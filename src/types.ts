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