import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"
import { Column, Id, Task } from "../types"
import Trash_icon from "./icons/Trash_icon";
import { useMemo, useState } from "react";
import Plus_Icon from "./icons/Plus_Icon";
import Kanban_Task from "./Kanban_Task";
import { truncateString } from "../utils/truncateString";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
    createTask: (columnId: Id) => void;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
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
    tasks: Task[];
}

interface PropsFooter {
    column: Column;
    createTask: (columnId: Id) => void;
}

function Column_Title({ column, deleteColumn, attributes, listeners, setEditMode, editMode, updateColumn, tasks }: PropsTitle){

    const [title, setTitle] = useState(column.title);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            updateColumn(column.id, title);
            setEditMode(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    return (
        <nav
            {...attributes}
            {...listeners}
            onClick={() => setEditMode(true)}
            className="bg-mainBackgroundColor text-2xl h-[6rem] cursor-grab rounded-lg rounded-b-none py-3 px-4 font-bold border-columnBackgroundColor border-4 flex justify-between items-center"
        >
            <h2 className="flex gap-5 items-center" title={column.title}>
                <span className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 rounded-lg">
                    {tasks.length}
                </span>

                {!editMode && truncateString(column.title, 30)}
                {editMode && 
                    <input
                        autoFocus
                        type="text"
                        placeholder="Column title here."
                        value={title}
                        onChange={handleChange}
                        onBlur={() => {
                            if (editMode) {
                                updateColumn(column.id, title);
                                setEditMode(false);
                            }
                        }}
                        onKeyDown={handleKeyDown}
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
            className="mt-auto flex gap-2 items-center border-mainBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black duration-150 text-xl font-semibold stroke-2"
            onClick={() => {
                createTask(column.id)
            }}
        >
            <Plus_Icon />
            Add task
        </button>
    )
}

function Kanban_Column({ column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask }: Props) {

    const [editMode, setEditMode] = useState(false);
    const tasksIds = useMemo(() => {
        return tasks.map(tasks => tasks.id);
    }, [tasks])
    
    const { 
        setNodeRef, 
        attributes, 
        listeners, 
        transform, 
        transition, 
        isDragging 
    } = useSortable({
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

    if(isDragging) return <div ref={setNodeRef} style={style} className="bg-columnBackgroundColor min-w-[35rem] w-[35rem] h-[50rem] max-h-[50rem] rounded-md flex flex-col opacity-60 border-2 border-rose-500"></div>

    return (
        <section 
            ref={setNodeRef}
            style={style}
            id={`${column.id}`}
            className="bg-columnBackgroundColor w-[35rem] min-w-[35rem] h-[50rem] max-h-[50rem] rounded-md flex flex-col"
        >
            <Column_Title 
                editMode={editMode}
                setEditMode={setEditMode}
                attributes={attributes}
                listeners={listeners}
                column={column}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                tasks={tasks}
            />
            
            <ul className="flex flex-col gap-4 p-2 flex-grow overflow-x-hidden overflow-y-auto">
                <SortableContext items={tasksIds}>
                    {tasks.map(task => (
                        <Kanban_Task
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                        />
                    ))}
                </SortableContext>
            </ul>

            <Column_Footer 
                column={column}
                createTask={createTask}
            />
        </section>
    )
}

export default Kanban_Column