export type Id = number;

export type Column = {
    id: Id;
    title: string;
}

export type Task = {
    id: Id,
    columnId: Id,
    content: string
}