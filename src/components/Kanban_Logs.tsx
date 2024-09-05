import { twMerge } from "tailwind-merge";
import { Column, Log } from "../types";
import { truncateString } from "../utils/functions/getTruncateString";
import Kanban_Modal from "./Kanban_Modal";
import { useModal } from "../hooks/useModal";
import Delete_Modal from "./geral.Delete_Modal";

interface Props {
    setOpenLogModal: (openLogModal: boolean) => void;
    logs: Log[];
    columns: Column[];
    deleteLogs: () => void
};

interface PropsContainer {
    log: Log;
    columns: Column[];
    index: number;
};

function Log_Container({ log, columns, index }: PropsContainer) {
    const logStyles: { [key: string]: string[] } = {
      createTask: ['bg-green-100', 'Created the task:'],
      deleteTask: ['bg-red-100', 'Deleted the task:'],
      updateTask: ['bg-yellow-100', 'Updated the task:'],
      createColumn: ['bg-green-100', 'Created the column:'],
      deletedColumn: ['bg-red-100', 'Deleted the column:'],
      updateColumn: ['bg-yellow-100', 'Updated the column:'],
      dragEnd: ['bg-purple-100', 'Dragged down']
    };
  
    return (
        <li
            className={twMerge('p-2 rounded relative shadow-md shadow-[#00000060] w-full max-w-full min-h-[6rem] text-columnBackgroundColor font-medium flex justify-start items-center gap-2 text-2xl ', logStyles[log.type][0] || 'bg-white text-black')}
        >   
            <span className="absolute top-1 left-3 text-base text-gray-500">
                {log.date}
            </span>

            <span className="absolute top-1 right-3 text-xl">
                #{index + 1}
            </span>

            {log.type === 'createTask' || log.type === 'createColumn' || log.type === 'deletedColumn' ? (
                <>
                    <p>{logStyles[log.type][1]}</p>
                    <p>"{truncateString(log.content, 12)}"</p>
                    <p>at {log.time}</p>
                </>
            ) : log.type === 'deleteTask' ? (
                <>
                    <p>{logStyles[log.type][1]}</p>
                    <p>"{truncateString(log.content, 12)}" from</p>
                    <p>"{columns.find(col => col.id === log.columnId)?.title}"</p>
                    <p>at {log.time}</p>
                </>
            ): log.type === 'updateTask' || log.type === 'updateColumn' ? (
                <>
                    <p>{logStyles[log.type][1]}</p>
                    {log.type === 'updateTask' ? (
                        <>
                            <p>"{truncateString(log.content, 12)}" from</p>
                            <p>"{columns.find(col => col.id === log.columnId)?.title}" to</p>
                            <p>"{truncateString(log.prevContent, 12)}"</p>
                        </>
                    ) : (
                        <>
                            <p>"{truncateString(log.prevContent, 12)}" to</p>
                            <p>"{truncateString(columns.find(col => col.id === log.columnId)?.title, 12)}"</p>
                        </>
                    )}
                    <p>at {log.time}</p>
                </>
            ) : (
                <>
                    <p>{log.content}</p>
                    <p>{log.time}</p>
                </>
            )}
        </li>
    );
  }

function Kanban_Logs({ setOpenLogModal, logs, columns, deleteLogs }: Props) {

    const { openModal, open, close } = useModal();

    return (
        <>
            <Kanban_Modal
                setOpenModal={setOpenLogModal}
            >
                <button
                    type="button"
                    onClick={(e) => {
                    e.preventDefault();
                    open("deleteLog");
                    }}
                    className="absolute right-10 bottom-10 flex gap-2 items-center border-gray-200 border-2 rounded-md py-4 justify-center w-64 hover:bg-rose-500 hover:border-rose-500 hover:text-gray-200 active:bg-black duration-150 text-xl font-semibold stroke-2"
                >
                    Delete all logs
                </button>
                
                <ul className="flex flex-col gap-6 overflow-y-auto h-full w-3/4 p-10">
                    {
                        logs.map((log, index) => (
                            <Log_Container 
                                columns={columns}
                                log={log}
                                index={index}
                            />
                        ))
                    }
                </ul>
            </Kanban_Modal>

            {openModal === "deleteLog" && 
                <Delete_Modal 
                close={() => close()}
                content={`Do you wish to delete all logs?`}
                handleDelete={() => deleteLogs()}
                />
            }
        </>
    );
}

export default Kanban_Logs