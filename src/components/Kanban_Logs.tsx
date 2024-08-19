import { twMerge } from "tailwind-merge";
import { Column, Log, Task } from "../types";
import Close_Icon from "./icons/Close_Icon";

interface Props {
    setOpenLogModal: (openLogModal: boolean) => void;
    logs: Log[];
    columns: Column[];
    tasks: Task[];
};

interface PropsContainer {
    log: Log;
    columns: Column[];
    tasks: Task[];
};

function Log_Container({ log, columns, tasks }: PropsContainer) {
    const logStyles: { [key: string]: string[] } = {
      createTask: ['bg-green-100', 'Created the task:'],
      deleteTask: ['bg-red-100', 'Deleted the task:'],
      updateTask: ['bg-blue-100', 'Updated the task:'],
      createColumn: ['bg-yellow-100', 'Created the column:'],
      deletedColumn: ['bg-gray-100', 'Deleted the column:'],
      updateColumn: ['bg-purple-100', 'Updated the column:'],
      dragEnd: ['bg-teal-100', 'Dragged down']
    };
  
    return (
        <li
            className={twMerge('p-2 min-h-[6rem] text-columnBackgroundColor font-medium flex gap-2 text-2xl ', logStyles[log.type][0] || 'bg-white text-black')}
        >   
            {log.type === 'createTask' || log.type === 'createColumn' || log.type === 'deletedColumn' ? (
                <>
                    <p>{logStyles[log.type][1]}</p>
                    <p>"{log.content}"</p>
                    <p>at {log.time}</p>
                </>
            ) : log.type === 'deleteTask' ? (
                <>
                    <p>{logStyles[log.type][1]}</p>
                    <p>"{log.content}" from</p>
                    <p>"{columns.find(col => col.id === log.columnId)?.title}"</p>
                    <p>at {log.time}</p>
                </>
            ): log.type === 'updateTask' || log.type === 'updateColumn' ? (
                <>
                    <p>{logStyles[log.type][1]}</p>
                    {log.type === 'updateTask' && (
                        <p>"{log.content}"</p>
                    )}
                    <p>"{columns.find(col => col.id === log.columnId)?.title}" to</p>
                    <p>"{log.prevContent}"</p>
                    <p>at {log.time}</p>
                </>
            ) : (
                <>
                    <p>{log.content}</p>
                    <p>{log.time}</p>
                </>
            )}
        </li>
      
        // columnId: {log.columnId}, taskId: {log.taskId}, id: {log.id}, content: {log.content}, prevContent: {log.prevContent} date: {log.date} type: {log.type}
    );
  }

function Kanban_Logs({ setOpenLogModal, logs, columns, tasks }: Props) {

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
                            columns={columns}
                            tasks={tasks}
                            log={log}
                        />
                    ))
                }
            </ul>

        </div>
    </section>
  );
}

export default Kanban_Logs