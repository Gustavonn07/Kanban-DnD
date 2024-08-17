import { Column, Id } from "../types"
import Trash_icon from "./icons/Trash_icon";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
}

function Column_Title({ column, deleteColumn }: Props) {

    return (
        <h2 
            className="bg-mainBackgroundColor text-2xl h-[6rem] cursor-grab rounded-lg rounded-b-none py-3 px-4 font-bold border-columnBackgroundColor border-4 flex justify-between items-center"
        >
            <div className="flex gap-5 items-center">
                <span className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 rounded-lg">
                    0
                </span>

                {column.title}
            </div>
            <button
                onClick={() => deleteColumn(column.id)}
                className="stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2"
            >
                <Trash_icon />
            </button>
        </h2>
    )
}

function Column_Container() {

    return (
        <div className="flex flex-grow">Content</div>
    )
}
function Column_Footer() {

    return (
        <div>Footer</div>
    )
}

function Kanban_Column({ column, deleteColumn }: Props) {

    return (
        <ul 
            id={`${column.id}`}
            className="bg-columnBackgroundColor w-[35rem] h-[50rem] max-h-[50rem] rounded-md flex flex-col"
        >
            <Column_Title 
                column={column} 
                deleteColumn={deleteColumn}
            />
            <Column_Container />
            <Column_Footer />
        </ul>
    )
}

export default Kanban_Column