import { useState } from "react";
import { Id, Task } from "../types"
import Trash_icon from "./icons/Trash_icon";

interface Props {
    task: Task;
    deleteTask: (id: Id) => void;
}

function Kanban_Task({ task, deleteTask }: Props) {

    const [mouseIsOver, setMouseIsOver] = useState(false);

    return (
        <li
            className="bg-mainBackgroundColor p-2.5 h-[10rem] min-h-[10rem] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 duration-150 cursor-grab text-xl relative"
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
        >
            {task.content}
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