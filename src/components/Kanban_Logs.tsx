import { twMerge } from "tailwind-merge";
import { Column, Log } from "../types";
import Close_Icon from "./icons/Close_Icon";
import { truncateString } from "../utils/truncateString";

interface Props {
    setOpenLogModal: (openLogModal: boolean) => void;
    logs: Log[];
    columns: Column[];
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

function Kanban_Logs({ setOpenLogModal, logs, columns }: Props) {

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

            <ul className="flex flex-col gap-6 overflow-y-auto h-full w-2/3 p-10">
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

        </div>
    </section>
  );
}

export default Kanban_Logs