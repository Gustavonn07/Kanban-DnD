import { useEffect, useMemo, useState } from "react";
import { Column, Log, Task } from "../types";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import Plus_Icon from "./icons/Plus_Icon";
import Kanban_Column from "./Kanban_Column";
import { createPortal } from "react-dom";
import Kanban_Task from "./Kanban_Task";
import Check_Icon from "./icons/Check_Icon";
import Kanban_Logs from "./Kanban_Logs";
import { KanbanMethods } from "../utils/functions/kanbanMethods";
import Kanban_Graphics from "./Kanban_Graphics";
import Graphic_Icon from "./icons/Graphic_Icon";
import { getDateInfo } from "../utils/classes/getDateInfo";
import Kanban_Create from "./Kanban_Create";
import { useModal } from "../hooks/useModal";

function Kanban_Board() {

  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const { openModal, open, close } = useModal();
  const months = new getDateInfo().getMonthsNames();
  
  const initialTasksPerMonth = () => {
    const savedTasksPerMonth = localStorage.getItem('tasksPerMonth');
    if (savedTasksPerMonth) {
      return JSON.parse(savedTasksPerMonth);
    }
    return new Array(months.length).fill(0);
  };

  const [tasksPerMonth, setTasksPerMonth] = useState<number[]>(initialTasksPerMonth);

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
  }, [logs]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // define a distância de arrasto inicial para considerar que é um drag-event em 3px
      }
    })
  );

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
              onClick={() => open('log')}
              className="h-[6rem] w-[35rem] min-w-[35rem] justify-center items-center stroke-2 text-2xl cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor ring-rose-500 hover:ring-2 duration-150 p-4 flex gap-2"
            >
              <Check_Icon />
              Check Logs
            </button>
            
            <button
              onClick={() => open('graphics')}
              className="h-[6rem] w-[35rem] min-w-[35rem] justify-center items-center stroke-2 text-2xl cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor ring-rose-500 hover:ring-2 duration-150 p-4 flex gap-2"
            >
              <Graphic_Icon />
              Check Graphics
            </button>
          </div>

          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.length !== 0 ? columns.map((col) => (
                <div key={col.id}>
                  <Kanban_Column
                    column={col}
                    updateColumn={updateColumn}
                    deleteColumn={deleteColumn}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                    tasks={tasks.filter(task => task.columnId === col.id)}
                    setOpenModal={() => open(`createTask ${col.id}`)}
                  />

                  {openModal === `createTask ${col.id}` && (
                    <Kanban_Create 
                      column={col}
                      createTask={createTask}
                      months={months}
                      setTasksPerMonth={setTasksPerMonth}
                      tasks={tasks}
                      setOpenModal={() => close()}
                    />
                  )}
                </div>
              )) : (
                <div className="w-full h-[50rem] bg-columnBackgroundColor flex justify-center items-center rounded">
                  <p className="text-4xl opacity-20 font-semibold">Create your first column, click at "+ Add column".</p>
                </div>
              )}
            </SortableContext>
          </div>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <div>
                <Kanban_Column 
                  deleteTask={deleteTask} 
                  updateTask={updateTask}
                  column={activeColumn} 
                  deleteColumn={deleteColumn} 
                  updateColumn={updateColumn} 
                  tasks={tasks.filter(task => task.columnId === activeColumn.id)}
                  setOpenModal={() => open(`createTask ${activeColumn.id}`)}
                />

                {openModal === `createTask ${activeColumn.id}` && (
                  <Kanban_Create 
                    column={activeColumn}
                    createTask={createTask}
                    months={months}
                    setTasksPerMonth={setTasksPerMonth}
                    tasks={tasks}
                    setOpenModal={() => close()}
                  />
                )}
              </div>
            )}
            {activeTask && <Kanban_Task task={activeTask} deleteTask={deleteTask} updateTask={updateTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      {openModal === 'log' && 
        <Kanban_Logs
          logs={logs}
          setOpenLogModal={() => close()}
          columns={columns}
        />
      }

      {openModal === 'graphics' && 
        <Kanban_Graphics
          setOpenGraphicsModal={() => close()}
          columns={columns}
          tasks={tasks}
          tasksPerMonth={tasksPerMonth}
          months={months}
        />
      }
    </main>
  );
}

export default Kanban_Board;