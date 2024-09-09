import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"
import { Column, Id, Task } from "../types"
import Trash_icon from "./icons/Trash_icon";
import { useMemo, useState } from "react";
import Plus_Icon from "./icons/Plus_Icon";
import Kanban_Task from "./Kanban_Task";
import { truncateString } from "../utils/functions/getTruncateString";
import { useModal } from "../hooks/useModal";
import Delete_Modal from "./geral.Delete_Modal";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: { title: string; desc: string; respon: string; priority: string }) => void;
    tasks: Task[];
    setOpenModal: (openModal: boolean) => void;
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
    setOpenModal: (openModal: boolean) => void;
}

function Column_Title({ column, deleteColumn, attributes, listeners, setEditMode, editMode, updateColumn, tasks }: PropsTitle){

    const [title, setTitle] = useState(column.title);
    const { openModal, open, close } = useModal();

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
            className="bg-mainBackgroundColor text-2xl h-[6rem] cursor-grab rounded-lg rounded-b-none py-3 px-4 font-bold border-columnBackgroundColor border-4 flex justify-between items-center"
        >
            <h2 
                className="flex gap-5 w-4/5 items-center cursor-pointer" title={truncateString(column.title, 20)}
                onClick={() => setEditMode(true)}
            >
                <span className="flex justify-center items-center px-2 py-1 rounded-lg">
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
                        onBlur={() => { if (editMode) {
                            updateColumn(column.id, title);
                            setEditMode(false);
                        }}}
                        onKeyDown={handleKeyDown}
                        className="bg-black focus:border-rose-500 border rounded w-11/12 outline-none px-2"
                    />
                }
            </h2>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    open('deleteColumn');
                }}
                className="stroke-gray-500 duration-150 hover:stroke-rose-600 hover:bg-columnBackgroundColor rounded px-1 py-2"
            >
                <Trash_icon />
            </button>

            {openModal === "deleteColumn" && 
                <Delete_Modal
                    close={() => close()}
                    content={`Do you wish delete the column ${truncateString(column.title, 10)}?`}
                    handleDelete={() => deleteColumn(column.id)}
                />
            }
        </nav>
    )
}

function Column_Footer({ setOpenModal }: PropsFooter) {

    return (
        <button
            className="mt-auto flex gap-2 items-center border-mainBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-violet-500 active:bg-black duration-150 text-xl font-semibold stroke-2"
            onClick={() => {
                setOpenModal(true);
            }}
        >
            <Plus_Icon />
            Add task
        </button>
    )
}

function Kanban_Column({ column, deleteColumn, updateColumn, tasks, deleteTask, updateTask, setOpenModal }: Props) {

    const [editMode, setEditMode] = useState(false);
    const tasksIds = useMemo(() => {
        return tasks.map(tasks => tasks.id);
    }, [tasks]);
    
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
            className="bg-columnBackgroundColor sm:w-[35rem] min-w-[25rem] h-[50rem] max-h-[50rem] rounded-md flex flex-col"
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

            <Column_Footer setOpenModal={setOpenModal}/>
        </section>
    )
}

export default Kanban_Column