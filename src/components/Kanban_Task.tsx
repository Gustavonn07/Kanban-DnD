import { useState } from "react";
import { Id, Task } from "../types"
import Trash_icon from "./icons/Trash_icon";

interface Props {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
}

function Kanban_Task({ task, deleteTask, updateTask }: Props) {

    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);

    function toggleEditMode() {
        setEditMode(prev => !prev);
        setMouseIsOver(false);
    }

    if(editMode) {
        return (
            <li
                className="bg-mainBackgroundColor p-2.5 h-[10rem] min-h-[10rem] items-center flex flex-col text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 duration-150 cursor-grab text-xl relative"
            >
                <p className="p-2 opacity-40">Press enter + shift to save</p>
                <textarea
                    className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
                    value={task.content}
                    placeholder="Task content here."
                    autoFocus
                    onBlur={toggleEditMode}
                    onKeyDown={e => {if(e.key === 'Enter' && e.shiftKey) toggleEditMode()}}
                    onChange={e => updateTask(task.id, e.target.value)}
                ></textarea>
            </li>
        )
    }

    return (
        <li
            onClick={toggleEditMode}
            className="bg-mainBackgroundColor p-2.5 h-[10rem] min-h-[10rem] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 duration-150 cursor-grab text-xl relative task"
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
        >
            <p
                className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap"
            >
                {task.content}
            </p>
            {
                mouseIsOver && (
                    <button 
                        className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded-lg opacity-60 hover:opacity-100"
                        onClick={() => deleteTask(task.id)}
                    >
                        <Trash_icon />
                    </button>
                )
            }
                
        </li>
    )
}

export default Kanban_Task