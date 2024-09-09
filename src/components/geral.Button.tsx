import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  handler: () => void;
  children: ReactNode;
  classButton?: string;
}

function Button({ handler, children, classButton }: Props) {

  return (
    <button
      onClick={handler}
      className={twMerge("h-[6rem] sm:w-[35rem] min-w-[25rem] justify-center items-center stroke-2 text-2xl cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor ring-violet-500 hover:ring-2 duration-150 p-4 flex gap-2", classButton)}
    >
      {children}
    </button>
  )
}

export default Button