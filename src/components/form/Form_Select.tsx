import { twMerge } from "tailwind-merge";
import { Option } from "../../types";

interface Props {
    options: Option[];
    title: string;
}

function Form_Select({ options, title }: Props) {

    return (
        <div
            className="flex flex-col"
        >
            <h3
                className="pb-6 text-3xl font-semibold"
            >
                {title}
            </h3>
            <select
                name="select-priority"
                className="rounded text-xl w-full h-16 hover:shadow-[#00000090] hover:shadow-lg hover:scale-[100.5%] focus:shadow-[#00000090] focus:shadow-lg focus:scale-[100.5%] duration-150 text-mainBackgroundColor px-4"
            >
                {options.map((option, index) => (
                    <option
                        id={`option#${index}`}
                        key={index}
                        className={twMerge(option.class, "h-10 text-mainBackgroundColor font-semibold")}
                    >
                        {option.text}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Form_Select