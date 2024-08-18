import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"
import { Column, Id, Task } from "../types"
import Trash_icon from "./icons/Trash_icon";
import { useState } from "react";
import Plus_Icon from "./icons/Plus_Icon";
import Kanban_Task from "./Kanban_Task";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
    createTask: (columnId: Id) => void;
    tasks: Task[];
}

interface PropsTitle {
    attributes: any; 
    listeners: any;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
}

interface PropsFooter {
    column: Column;
    createTask: (columnId: Id) => void;
}

function Column_Title({ column, deleteColumn, attributes, listeners, setEditMode, editMode, updateColumn }: PropsTitle){

    return (
        <nav
            {...attributes}
            {...listeners}
            onClick={() => setEditMode(true)}
            className="bg-mainBackgroundColor text-2xl h-[6rem] cursor-grab rounded-lg rounded-b-none py-3 px-4 font-bold border-columnBackgroundColor border-4 flex justify-between items-center"
        >
            <h2 className="flex gap-5 items-center">
                <span className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 rounded-lg">
                    0
                </span>

                {!editMode && column.title}
                {editMode && 
                    <input
                        autoFocus
                        type="text"
                        value={column.title}
                        onChange={e => updateColumn(column.id, e.target.value)}
                        onBlur={() => setEditMode(false)}
                        onKeyDown={e => {
                            if(e.key !== "Enter") return;
                            setEditMode(false);
                        }}
                        className="bg-black focus:border-rose-500 border rounded outline-none px-2"
                    />
                }
            </h2>
            <button
                onClick={() => deleteColumn(column.id)}
                className="stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2"
            >
                <Trash_icon />
            </button>
        </nav>
    )
}

function Column_Footer({ column, createTask }: PropsFooter) {

    return (
        <button
            className="mt-auto flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black duration-150 text-xl font-semibold"
            onClick={() => {
                createTask(column.id)
            }}
        >
            <Plus_Icon />
            Add task
        </button>
    )
}

function Kanban_Column({ column, deleteColumn, updateColumn, createTask, tasks }: Props) {

    const [editMode, setEditMode] = useState(false);

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
        disabled: editMode
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if(isDragging) return <div ref={setNodeRef} style={style} className="bg-columnBackgroundColor w-[35rem] h-[50rem] max-h-[50rem] rounded-md flex flex-col opacity-60 border-2 border-rose-500"></div>

    return (
        <section 
            ref={setNodeRef}
            style={style}
            id={`${column.id}`}
            className="bg-columnBackgroundColor w-[35rem] h-[50rem] max-h-[50rem] rounded-md flex flex-col"
        >
            <Column_Title 
                editMode={editMode}
                setEditMode={setEditMode}
                attributes={attributes}
                listeners={listeners}
                column={column}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
            />
            
            <ul className="flex flex-col gap-4 p-2 flex-grow overflow-x-hidden overflow-y-auto">
                {
                    tasks.map(task => (
                        <Kanban_Task key={task.id} task={task} />
                    ))
                }
            </ul>

            <Column_Footer 
                column={column}
                createTask={createTask}
            />
        </section>
    )
}

export default Kanban_Column