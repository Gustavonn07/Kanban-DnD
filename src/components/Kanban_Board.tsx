import { useState } from "react"
import Plus_Icon from "./icons/Plus_Icon"
import { Column } from "../types";
import { generateId } from "../utils/generateId";

function Kanban_Board() {

  const [columns, setColumns] = useState<Column[]>([]);

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId('column'),
      title: `Column ${columns.length + 1}`
    }

    setColumns([...columns, columnToAdd])
  }
  
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[4rem]">

      <div className="m-auto">
        <button
          onClick={() => createNewColumn()}
          className="h-[6rem] w-[35rem] min-w-[35rem] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor ring-rose-500 hover:ring-2 duration-150 text-xl p-4 flex gap-2"
        >
          <Plus_Icon />
          Add Column
        </button>
      </div>
    </div>
  )
}

export default Kanban_Board