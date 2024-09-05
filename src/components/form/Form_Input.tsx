import { twMerge } from "tailwind-merge";
import { Dispatch, SetStateAction } from "react";

interface Props {
  label: string;
  typeValue: "title" | "responsible" | "description" | "priority" | string;
  setValue: Dispatch<SetStateAction<any>>;
  value: {
    title: string;
    respon: string;
    desc: string;
    priority: string;
  };
  type: string;
  id: number; 
  classesLabel?: string;
  classesInput?: string;
  placeholder?: string;
  limiteChar?: number;
}

function Form_Input({
  label,
  typeValue,
  setValue,
  value,
  type,
  id,
  placeholder,
  classesLabel,
  classesInput,
  limiteChar = 100
}: Props) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValue((prev: any) => ({
      ...prev,
      [typeValue]: value
    }));
  };

  const getCharCount = () => {
    switch (typeValue) {
      case 'title':
        return value.title.length;
      case 'desc':
        return value.desc.length;
      case 'respon':
        return value.respon.length;
      default:
        return 0;
    }
  };

  const charCount = getCharCount();

  return (
    <div className="flex flex-col w-full">
      <label 
        htmlFor={`input#${id}`}
        className={twMerge('pb-6 text-3xl font-semibold', classesLabel)}
      >
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea 
          id={`input#${id}`} 
          rows={15}
          className={twMerge(
            'resize-none rounded text-xl outline-none hover:shadow-[#00000090] hover:shadow-lg hover:scale-[100.5%] focus:shadow-[#00000090] focus:shadow-lg focus:scale-[100.5%] duration-150 text-mainBackgroundColor p-4',
            classesInput
          )}
          placeholder={placeholder}
          maxLength={limiteChar}
          onChange={handleChange}
        />
      ) : (
        <input
          id={`input#${id}`}
          name={typeValue}
          type={type}
          className={twMerge(
            'min-h-16 rounded text-xl outline-none hover:shadow-[#00000090] hover:shadow-lg hover:scale-[100.5%] focus:shadow-[#00000090] focus:shadow-lg focus:scale-[100.5%] duration-150 text-mainBackgroundColor px-4',
            classesInput
          )}
          placeholder={placeholder}
          maxLength={limiteChar}
          onChange={handleChange}
        />
      )}
      <span className="pt-1 self-end text-lg">
        {charCount}/{limiteChar}
      </span>
    </div>
  );
}

export default Form_Input;