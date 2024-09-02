import { Dispatch, SetStateAction, useState } from "react";
import { Column, Task } from "../types";
import { useTasksPerMonth } from "../hooks/useTasksPerMonth";
import Kanban_Modal from "./Kanban_Modal";
import Form_Input from "./form/Form_Input";
import Form_Select from "./form/Form_Select";

interface Props {
    column: Column;
    createTask: (task: Task) => void;
    setTasksPerMonth: Dispatch<SetStateAction<number[]>>;
    setOpenModal: (openModal: boolean) => void;
    months: string[];
    tasks: Task[];
}

function Kanban_Create({ column, createTask, setTasksPerMonth, months, tasks, setOpenModal }: Props) {

    const inputs = [
        {
            label: "Task Title:",
            type: "text",
            classesInput: "",
            classesLabel: "",
            typeValue: "title",
            placeholder: "Enter the title"
        },
        {
            label: "Task Responsible:",
            type: "text",
            classesInput: "",
            classesLabel: "",
            typeValue: "responsible",
            placeholder: "Enter the person responsible for the task"
        },
        {
            label: "Task Description:",
            limiteChar: 500,
            type: "area",
            classesInput: "",
            classesLabel: "",
            typeValue: "description",
            placeholder: "Enter the description"
        }
    ];

    const options = [
        {
            text: "Low",
            class: "bg-emerald-400"
        },
        {
            text: "Normal",
            class: "bg-amber-300"
        },
        {
            text: "Urgent",
            class: "bg-rose-500"
        }
    ]

    const [taskValues, setTaskValues] = useState({
        title: '',
        responsible: '',
        description: '',
        priority: 'Low'
    });

    const handleConfirm = () => {
        const newTask: Task = {
            id: Date.now().toString(),
            columnId: column.id,
            content: {
                title: taskValues.title,
                desc: taskValues.description,
                respon: taskValues.responsible,
                priority: taskValues.priority
            },
            createdAt: new Date().toISOString()
        };

        createTask(newTask);
        
        useTasksPerMonth({months, tasks: [...tasks, newTask], setTasksPerMonth});
        
        setOpenModal(false);
    };

    return (
        <Kanban_Modal
            setOpenModal={setOpenModal}
        >
            <form className="grid grid-cols-2 w-full gap-y-10 gap-x-32 px-32 py-16">
                {
                    inputs.map((input, index) => (
                        <Form_Input
                            key={index}
                            id={index}
                            typeValue={input.typeValue}
                            setValue={setTaskValues}
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
                    title="Priority:"
                    options={options}
                />
            </form>

            <div className="ml-32 flex gap-10">
                <button
                    className="mt-auto flex gap-2 items-center border-gray-200 border-2 rounded-md py-4 justify-center w-64 hover:bg-emerald-300 hover:border-emerald-300 hover:text-mainBackgroundColor active:bg-black duration-150 text-xl font-semibold stroke-2"
                    onClick={() => handleConfirm()}
                >
                    Confirm
                </button>
                <button
                    className="mt-auto flex gap-2 items-center border-gray-200 border-2 rounded-md py-4 justify-center w-64 hover:bg-rose-500 hover:border-rose-500 hover:text-gray-200 active:bg-black duration-150 text-xl font-semibold stroke-2"
                    onClick={() => {
                        setOpenModal(false);
                    }}
                >
                    Cancel
                </button>
            </div>
        </Kanban_Modal>
    )
}

export default Kanban_Create