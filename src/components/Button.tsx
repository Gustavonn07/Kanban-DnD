import { ReactNode } from "react";

interface Props {
    // Enquanto nao decidir o que fazer com column
    handler: any;
    children: ReactNode;
}

function Button({ handler, children }: Props) {

  return (
    <button
        onClick={handler}
        className="h-[6rem] w-[35rem] min-w-[35rem] justify-center items-center stroke-2 text-2xl cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor ring-violet-500 hover:ring-2 duration-150 p-4 flex gap-2"
    >
        {children}
    </button>
  )
}

export default Button