import { twMerge } from "tailwind-merge";
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
    const logStyles: { [key: string]: string } = {
      createTask: 'bg-green-100 text-green-800',
      deleteTask: 'bg-red-100 text-red-800',
      updateTask: 'bg-blue-100 text-blue-800',
      createColumn: 'bg-yellow-100 text-yellow-800',
      deletedColumn: 'bg-gray-100 text-gray-800',
      updateColumn: 'bg-purple-100 text-purple-800',
      dragEnd: 'bg-teal-100 text-teal-800'
    };
  
    return (
      <li
        className={twMerge('p-2 min-h-[6rem]', logStyles[log.type] || 'bg-white text-black')}
      >
        {log.content}
        {log.time}
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

            <ul className="flex flex-col gap-6 overflow-y-auto h-full p-4">
                {
                    logs.map(log => (
                        <Log_Container 
                            log={log}
                        />

                        //columnId: {log.columnId}, taskId: {log.taskId}, id: {log.id}, content: {log.content}, prevContent: {log.prevContent} date: {log.date} type: {log.type}
                    ))
                }
            </ul>

        </div>
    </section>
  );
}

export default Kanban_Logs