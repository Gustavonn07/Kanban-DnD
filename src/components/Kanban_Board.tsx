import { useEffect, useMemo, useState } from "react"
import { Column, Log, Task } from "../types";
import { DndContext ,DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import Plus_Icon from "./icons/Plus_Icon"
import Kanban_Column from "./Kanban_Column";
import { createPortal } from "react-dom";
import Kanban_Task from "./Kanban_Task";
import Check_Icon from "./icons/Check_Icon.tsx";
import Kanban_Logs from "./Kanban_Logs.tsx";
import { KanbanMethods } from "../utils/kanbanMethods.ts";

function Kanban_Board() {

  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [openLogModal, setOpenLogModal] = useState<boolean>(false);

  const {
    createNewColumn,
    createTask,
    deleteColumn,
    deleteTask,
    onDragEnd,
    onDragOver,
    onDragStart,
    updateColumn,
    updateTask
  } = KanbanMethods({
    columns,
    setColumns,
    tasks,
    setTasks,
    logs,
    setLogs,
    setActiveColumn,
    activeColumn,
    setActiveTask
  });

  useEffect(() => {
    const storedColumns = localStorage.getItem('columns');
    const storedTasks = localStorage.getItem('tasks');
    const storedLogs = localStorage.getItem('logs');

    if (storedColumns) setColumns(JSON.parse(storedColumns));
    if (storedTasks) setTasks(JSON.parse(storedTasks));
    if (storedLogs) setLogs(JSON.parse(storedLogs));
  }, []);

  useEffect(() => {

    localStorage.setItem('columns', JSON.stringify(columns));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('logs', JSON.stringify(logs));
  }, [columns, tasks, logs]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // define a distancia de arrasto inicial para ele considerar que é um drag-event em 3px
        distance: 3, 
      }
    })
  )

  return (
    <main className="m-auto relative flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[4rem]">
      <DndContext 
        onDragStart={onDragStart} 
        onDragEnd={onDragEnd} 
        onDragOver={onDragOver}
        sensors={sensors}
      >
        <div className="m-auto flex flex-col justify-start gap-4 min-h-[90vh] w-full">
          <div className="flex gap-4">
            <button
                onClick={() => createNewColumn()}
                className="h-[6rem] w-[35rem] min-w-[35rem] justify-center items-center stroke-2 text-2xl cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor ring-rose-500 hover:ring-2 duration-150 p-4 flex gap-2"
              >
              <Plus_Icon />
              Add Column
            </button>
            
            <button
                onClick={() => setOpenLogModal(true)}
                className="h-[6rem] w-[35rem] min-w-[35rem] justify-center items-center stroke-2 text-2xl cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor ring-rose-500 hover:ring-2 duration-150 p-4 flex gap-2"
              >
              <Check_Icon />
              Check Logs
            </button>
          </div>

          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.length !== 0 ? columns.map((col) => (
                <Kanban_Column
                  column={col}
                  key={col.id}
                  updateColumn={updateColumn}
                  deleteColumn={deleteColumn}
                  updateTask={updateTask}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  tasks={tasks.filter(tasks => tasks.columnId === col.id)}
                />
                )) : (
                  <div className="w-full h-[50rem] bg-columnBackgroundColor flex justify-center items-center rounded">
                    <p className="text-4xl opacity-20 font-semibold">Create your first column, click at "+ Add column".</p>
                  </div>
                )
              }
            </SortableContext>
          </div>
        </div>

        {createPortal(
          <DragOverlay>
                {activeColumn && (
                  <Kanban_Column 
                    deleteTask={deleteTask} 
                    createTask={createTask} 
                    updateTask={updateTask}
                    column={activeColumn} 
                    deleteColumn={deleteColumn} 
                    updateColumn={updateColumn} 
                    tasks={tasks.filter(tasks => tasks.columnId === activeColumn.id)}
                  />
                )}
                {activeTask && <Kanban_Task task={activeTask} deleteTask={deleteTask} updateTask={updateTask}/>}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      {openLogModal && 
        <Kanban_Logs
          logs={logs}
          setOpenLogModal={setOpenLogModal}
          columns={columns}
        />
      }
    </main>
  )
}

export default Kanban_Board