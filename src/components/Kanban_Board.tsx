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
import Button from "./geral.Button";
import Kanban_Modal from "./Kanban_Modal";

function Kanban_Board() {

  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

  const [columnTitle, setColumnTitle] = useState<string>("new Column");
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [taskValues, setTaskValues] = useState({
    title: '',
    respon: '',
    desc: '',
    priority: 'Low'
});

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
    updateTask,
    deleteLogs
  } = KanbanMethods({
    columns,
    setColumns,
    tasks,
    setTasks,
    logs,
    setLogs,
    setActiveColumn,
    activeColumn,
    setActiveTask,
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
            <Button
              handler={() => open('column')}
            >
              <Plus_Icon />
              Add Column
            </Button>
            
            <Button
              handler={() => open('log')}
            >
              <Check_Icon />
              Check Logs
            </Button>
            
            <Button
              handler={() => open('graphics')}
            >
              <Graphic_Icon />
              Check Graphics
            </Button>
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
                      setValue={setTaskValues}
                      value={taskValues}
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
                    setValue={setTaskValues}
                    value={taskValues}
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

      {openModal === 'column' && 
        <Kanban_Modal
          setOpenModal={() => close()}
          classDiv="w-1/4 h-1/3 -translate-y-3/4"
        >
          <div className="flex flex-col w-full h-full justify-center px-12 gap-10">
            <label
              htmlFor="columnInpt"
              className="text-3xl font-semibold"
            >
              Create new column:
            </label>

            <input
              type="text"
              id="columnInpt"
              className="min-h-16 rounded text-xl outline-none hover:shadow-[#00000090] hover:shadow-lg hover:scale-[100.5%] focus:shadow-[#00000090] focus:shadow-lg focus:scale-[100.5%] duration-150 text-mainBackgroundColor px-4"
              placeholder="Column name"
              onChange={e => setColumnTitle(e.target.value)}
            />

            <button
              className="flex gap-2 items-center border-gray-200 bg-gray-200 border-2 rounded-md py-2 px-4 max-w-28 justify-center hover:bg-emerald-300 hover:border-emerald-300 text-mainBackgroundColor active:bg-black duration-150 text-xl font-semibold stroke-2"
              onClick={() => {
                  createNewColumn(columnTitle);
                  setColumnTitle("New column");
                  close();
                }
              }
            >
              Confirm
            </button>
          </div>
        </Kanban_Modal>
      }

      {openModal === 'log' && 
        <Kanban_Logs
          logs={logs}
          setOpenLogModal={() => close()}
          columns={columns}
          deleteLogs={deleteLogs}
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