import { Dispatch, SetStateAction } from "react";
import { Column, Id, Task } from "../types";
import { useTasksPerMonth } from "../hooks/useTasksPerMonth";
import Kanban_Modal from "./Kanban_Modal";
import Form_Input from "./form/Form_Input";
import Form_Select from "./form/Form_Select";

interface Props {
    column: Column;
    createTask: (columnId: Id) => void;
    setTasksPerMonth: Dispatch<SetStateAction<number[]>>;
    setOpenModal: (openModal: boolean) => void;
    months: string[];
    tasks: Task[];
}

function Kanban_Create({ column, createTask, setTasksPerMonth, months, tasks, setOpenModal }: Props) {

    const inputs = [
        {
            label: "Título da tarefa",
            type: "text",
            classesInput: "",
            classesLabel: "",
            placeholder: "Insira o titulo"
        },
        {
            label: "Descrição da tarefa",
            limiteChar: 500,
            type: "area",
            classesInput: "",
            classesLabel: "",
            placeholder: "Insira a descrição"
        },
        {
            label: "Responsavel pela tarefa",
            type: "text",
            classesInput: "",
            classesLabel: "",
            placeholder: "Insira o responsavel pela tarefa"
        }
    ];

    return (
        <Kanban_Modal
            setOpenModal={setOpenModal}
        >
            <form className="flex flex-wrap gap-20 px-10 bg-red-200">
                {
                    inputs.map((input, index) => (
                        <Form_Input
                            id={index}
                            label={input.label}
                            limiteChar={input.limiteChar}
                            type={input.type}
                            classesInput={input.classesInput}
                            classesLabel={input.classesLabel}
                            placeholder={input.placeholder}
                        />
                    ))
                }

                <Form_Select 

                />
            </form>

            <button
                className="mt-auto flex gap-2 items-center border-gray-200 border-2 rounded-md py-4 px-8 hover:bg-emerald-300 hover:border-emerald-300 hover:text-mainBackgroundColor active:bg-black duration-150 text-xl font-semibold stroke-2"
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