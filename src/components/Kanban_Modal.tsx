import Close_Icon from "./icons/Close_Icon";
import { ReactNode } from "react";

interface Props {
    setOpenModal: (openModal: boolean) => void;
    children: ReactNode
}

function Kanban_Modal({ setOpenModal, children }: Props) {

    return (
        <section 
            onClick={() => setOpenModal(false)}
            className="absolute left-0 top-0 w-full h-screen flex justify-center items-center bg-[#00000080]"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-10/12 relative stroke-2 h-[90vh] rounded shadow-md shadow-[#00000060] bg-mainBackgroundColor"
            >
                <button 
                    onClick={() => setOpenModal(false)}
                    className="absolute top-4 right-6 hover:bg-rose-500 rounded cursor-pointer duration-150"
                >
                    <Close_Icon/>
                </button>
                {children}
            </div>
        </section>
    )
}

export default Kanban_Modal;