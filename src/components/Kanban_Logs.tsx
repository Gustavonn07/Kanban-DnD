import { Log } from "../types";
import Close_Icon from "./icons/Close_Icon";

interface Props {
    setOpenLogModal: (openLogModal: boolean) => void;
    logs: Log[];
};

interface PropsContainer {
    log: Log;
};

function Log_Container({ log }: PropsContainer) {

    return (
        <li

        >
            
        </li>
    );
}

function Kanban_Logs({ setOpenLogModal, logs }: Props) {

  return (

    <section 
        onClick={() => setOpenLogModal(false)}
        className="absolute left-0 w-full h-screen flex justify-center items-center bg-[#00000060]"
    >
        <div
            onClick={(e) => e.stopPropagation()}
            className="w-10/12 relative stroke-2 h-[90vh] rounded shadow-md shadow-[#00000060] bg-gray-500"
        >
            <button 
                onClick={() => setOpenLogModal(false)}
                className="absolute top-4 right-6 hover:bg-rose-500 rounded cursor-pointer duration-150"
            >
                <Close_Icon/>
            </button>

            <ul>

            </ul>

        </div>
    </section>
  );
}

export default Kanban_Logs