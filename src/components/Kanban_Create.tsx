import { Dispatch, SetStateAction } from "react";
import { Column, Id, Task } from "../types";
import { useTasksPerMonth } from "../hooks/useTasksPerMonth";
import Kanban_Modal from "./Kanban_Modal";

interface Props {
    column: Column;
    createTask: (columnId: Id) => void;
    setTasksPerMonth: Dispatch<SetStateAction<number[]>>;
    setOpenModal: (openModal: boolean) => void;
    months: string[];
    tasks: Task[];
}

function Kanban_Create({ column, createTask, setTasksPerMonth, months, tasks, setOpenModal }: Props) {

  return (
    <Kanban_Modal
        setOpenModal={setOpenModal}
    >
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        <button
            className="mt-auto flex gap-2 items-center border-mainBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black duration-150 text-xl font-semibold stroke-2"
            onClick={() => {
                createTask(column.id);
                useTasksPerMonth({months, tasks, setTasksPerMonth});
            }}
        >
            Confirm
        </button>
    </Kanban_Modal>
  )
}

export default Kanban_Create