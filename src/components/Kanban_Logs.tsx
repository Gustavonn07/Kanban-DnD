import { Id, Log } from "../types";
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
        className="absolute left-0 w-full h-screen flex justify-center items-center bg-[#00000080]"
    >
        <div
            onClick={(e) => e.stopPropagation()}
            className="w-10/12 relative stroke-2 h-[90vh] rounded shadow-md shadow-[#00000060] bg-mainBackgroundColor"
        >
            <button 
                onClick={() => setOpenLogModal(false)}
                className="absolute top-4 right-6 hover:bg-rose-500 rounded cursor-pointer duration-150"
            >
                <Close_Icon/>
            </button>

            <ul>
                {
                    logs.map(log => (
                        <li
                        
                        >
                            columnId: {log.columnId}, taskId: {log.taskId}, id: {log.id}, content: {log.content}, prevContent: {log.prevContent} date: {log.date} type: {log.type}
                        </li>
                    ))
                }
            </ul>

        </div>
    </section>
  );
}

export default Kanban_Logs