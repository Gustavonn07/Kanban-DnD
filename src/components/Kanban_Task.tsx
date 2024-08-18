import { Task } from "../types"

interface Props {
    task: Task;
}

function Kanban_Task({ task }: Props) {

    return (
        <li
            className="bg-mainBackgroundColor p-2.5 h-[10rem] min-h-[10rem] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 duration-150 cursor-grab"
        >
            {task.content}
        </li>
    )
}

export default Kanban_Task