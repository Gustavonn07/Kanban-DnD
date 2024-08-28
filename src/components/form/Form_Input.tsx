import { twMerge } from "tailwind-merge"
import { Id } from "../../types";

interface Props {
    label: string;
    type: string;
    id: Id; 
    classesLabel?: string;
    classesInput?: string;
    placeholder?: string;
    limiteChar?: number
}

function Form_Input({label, type, id, placeholder, classesLabel, classesInput, limiteChar=100 }: Props) {

    return (
        <div className="flex flex-col w-1/3">
            <label 
                htmlFor={`input#${id}`}
                className={twMerge('pb-2 text-3xl font-semibold', classesLabel)}
            >
                {label}
            </label>
            {!(type === 'area') ? ( 
                <input
                    id={`input#${id}`}
                    name={`input#${id}`}
                    type={type}
                    className={twMerge('h-16 rounded text-xl outline-none hover:shadow-[#00000090] hover:shadow-lg hover:scale-[100.5%] focus:shadow-[#00000090] focus:shadow-lg focus:scale-[100.5%] duration-150 text-mainBackgroundColor px-4', classesInput)}
                    placeholder={placeholder}
                />
            ) : (
                <>
                {/* USAR TEXTAREA */}
                </>
            )}
            <span
                className="pt-1 self-end text-lg"
            >
                {/* inserir calculo de limite de caracteres */}
                00 / {limiteChar}
            </span>
        </div>
    )
}

export default Form_Input