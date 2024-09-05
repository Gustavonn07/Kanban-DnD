import { twMerge } from "tailwind-merge";
import { Option } from "../../types";
import { Dispatch, SetStateAction } from "react";

interface Props {
    options: Option[];
    title: string;
    setValue: Dispatch<SetStateAction<{
        title: string;
        respon: string;
        desc: string;
        priority: string;
    }>>;
    classesLabel?: string
    classesSelect?: string
    valueDefined?: string;
}

function Form_Select({ options, title, setValue, valueDefined, classesLabel, classesSelect }: Props) {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const selectedOption = options.find(option => option.text === value);
        
        if (selectedOption) {
            setValue(prev => ({
                ...prev,
                [selectedOption.typeValue || 'priority']: value
            }));
        }
    };

    return (
        <div className="flex flex-col">
            <h3 className={twMerge("pb-6 text-3xl font-semibold", classesLabel)}>{title}</h3>
            <select
                name="select-priority"
                className={twMerge("rounded text-xl w-full h-16 hover:shadow-[#00000090] hover:shadow-lg hover:scale-[100.5%] focus:shadow-[#00000090] focus:shadow-lg focus:scale-[100.5%] duration-150 text-mainBackgroundColor px-4", classesSelect)}
                onChange={handleChange}
                value={valueDefined}
            >
                <option value="" disabled>Select an option</option>
                {options.map((option, index) => (
                    <option
                        id={`option#${index}`}
                        key={index}
                        value={option.text}
                        className={twMerge(option.class, "h-10 text-mainBackgroundColor font-semibold")}
                    >
                        {option.text}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Form_Select;