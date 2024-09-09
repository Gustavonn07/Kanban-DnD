import { Dispatch, SetStateAction } from "react";
import { Column, Id, Task } from "../types";
import { useTasksPerMonth } from "../hooks/useTasksPerMonth";
import Kanban_Modal from "./Kanban_Modal";
import Form_Input from "./form/Form_Input";
import Form_Select from "./form/Form_Select";
import { toast } from "sonner";
import { inputs, options } from "./assets/tasks.inputs";

interface Props {
    column: Column;
    createTask: (columnId: Id, content: { title: string; desc: string; respon: string; priority: string }) => void;
    setTasksPerMonth: Dispatch<SetStateAction<number[]>>;
    setOpenModal: (openModal: boolean) => void;
    months: string[];
    tasks: Task[];
    setValue: Dispatch<SetStateAction<{
        title: string;
        respon: string;
        desc: string;
        priority: string;
    }>>;
    value: {
        title: string;
        respon: string;
        desc: string;
        priority: string;
    };
}

function Kanban_Create({ column, createTask, setTasksPerMonth, months, tasks, setOpenModal, setValue, value }: Props) {

    const handleConfirm = () => {
        if(
            value.desc.length != 0 ||
            value.respon.length != 0 ||
            value.title.length != 0 
        ) {
            createTask(column.id, value);
            useTasksPerMonth({months, tasks, setTasksPerMonth});
            setOpenModal(false);

        } else {
            toast.error("Todos os campos devem estar preenchidos.");
        }
    };

    return (
        <Kanban_Modal 
            setOpenModal={setOpenModal}
            classDiv="sm:h-10/12 self-center"
        >
            <form className="grid sm:grid-cols-2 grid-cols-1 overflow-y-scroll w-full lg:gap-y-10 lg:gap-x-32 lg:px-32 lg:py-16 gap-y-2.5 gap-x-8 px-8 py-4">
                {inputs.map((input, index) => (
                    <Form_Input
                        key={index}
                        id={index}
                        typeValue={input.typeValue}
                        setValue={setValue}
                        value={value}
                        label={input.label}
                        limiteChar={input.limiteChar}
                        type={input.type}
                        classesInput={input.classesInput}
                        classesLabel={input.classesLabel}
                        placeholder={input.placeholder}
                    />
                ))}
                <Form_Select 
                    title="Priority:"
                    options={options}
                    setValue={setValue}
                />
            </form>

            <div className="md:absolute pl-8 md:p-0 right-32 lg:bottom-20 bottom-10 flex gap-10">
                <button
                    className="mt-auto flex gap-2 items-center border-gray-200 border-2 rounded-md py-4 justify-center w-64 hover:bg-rose-500 hover:border-rose-500 hover:text-gray-200 active:bg-black duration-150 text-xl font-semibold stroke-2"
                    onClick={() => setOpenModal(false)}
                >
                    Cancel
                </button>
                <button
                    className="mt-auto flex gap-2 items-center border-gray-200 bg-gray-200 border-2 rounded-md py-4 justify-center w-64 hover:bg-emerald-300 hover:border-emerald-300 text-mainBackgroundColor active:bg-black duration-150 text-xl font-semibold stroke-2"
                    onClick={handleConfirm}
                >
                    Confirm
                </button>
            </div>
        </Kanban_Modal>
    );
}

export default Kanban_Create;
