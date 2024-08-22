import { useEffect, useMemo, useState } from "react"
import { Column, Id, Log, Task } from "../types";
import { generateKey } from "../utils/generateKey.ts";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import Plus_Icon from "./icons/Plus_Icon"
import Kanban_Column from "./Kanban_Column";
import { createPortal } from "react-dom";
import Kanban_Task from "./Kanban_Task";
import Check_Icon from "./icons/Check_Icon.tsx";
import Kanban_Logs from "./Kanban_Logs.tsx";
import { generateId } from "../utils/generateId.ts";
import { getDateInfo } from "../utils/getDateInfo.ts";

function Kanban_Board() {

  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [openLogModal, setOpenLogModal] = useState<boolean>(false);

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

  function createLog(columnId: Id, content: string, type: string, prevContent?: string, taskId?: Id,) {
    const newLog: Log = {
      id: generateId('log'),
      columnId,
      taskId,
      content,
      type,
      time: new getDateInfo().getCurrentTime(),
      date: new getDateInfo().getDateString(),
      prevContent
    };

    setLogs([...logs, newLog]);
  }

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateKey(),
      columnId,
      content: `Task ${tasks.length + 1}`
    };

    createLog(newTask.columnId, newTask.content, "createTask", '' , newTask.id);

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    const deletedTask = tasks.find(task => task.id === id);

    if (deletedTask) {
      const filteredTasks = tasks.filter(task => task.id !== id);
      setTasks(filteredTasks);

      createLog(deletedTask.columnId, deletedTask.content, "deleteTask", '', deletedTask.id);
    }
  }

  function updateTask(id: Id, content: string) {
    const prevContent = tasks.find(task => task.id === id)?.content;
    const newTasks = tasks.map(task => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    
    setTasks(newTasks);

    const updatedTask = newTasks.find(task => task.id === id);

    if (updatedTask) {
      createLog(updatedTask.columnId, updatedTask.content, "updateTask", prevContent, updatedTask.id);
    };
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateKey(),
      title: `Column ${columns.length + 1}`
    }

    setColumns([...columns, columnToAdd]);

    createLog(columnToAdd.id, columnToAdd.title, "createColumn");
  }

  function deleteColumn(id: Id) {
    const deletedColumn = columns.find(col => col.id === id);

    if (deletedColumn) {
      const filteredColumns = columns.filter(col => col.id !== id);
      setColumns(filteredColumns);

      const newTasks = tasks.filter(task => task.columnId !== id);
      setTasks(newTasks);

      createLog(id, `${columns.find(col => col.id === id)?.title}`, 'deletedColumn');
    }
}

  function updateColumn(id: Id, title: string) {
    const prevContent = columns.find(column => column.id === id)?.title;
    const newColumns = columns.map(col => {
      if(col.id !== id) return col;
      return {...col, title}
    });

    setColumns(newColumns);

    const updatedColumn = newColumns.find(col => col.id === id);

    if (updatedColumn) {
      createLog(updatedColumn.id, updatedColumn.title, "updateColumn", prevContent);
    };
  }

  function onDragStart(event: DragStartEvent) {
    if(event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current?.column);
      return;
    }
    
    if(event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current?.task);
      return;
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    const isOverAColumn = over.data.current?.type === "Column";

    // Dropping a task over another task
    if (isActiveATask && isOverATask) {
        setTasks(tasks => {
            const activeIndex = tasks.findIndex(t => t.id === activeId);
            const overIndex = tasks.findIndex(t => t.id === overId);

            const newTasks = tasks.map(task => {
                if (task.id === activeId) {
                    return { ...task, columnId: tasks[overIndex].columnId };
                }
                return task;
            });

            createLog(activeId, `Dragged task "${active.data.current?.task.content}" from column "${columns.find(col => col.id === tasks.find(task => task.id === activeId)?.columnId)?.title || 'Unknown Column'}" to task "${over.data.current?.task.content}" from column "${columns.find(col => col.id === tasks.find(task => task.id === overId)?.columnId)?.title}" at`, "dragEnd");

            return arrayMove(newTasks, activeIndex, overIndex);
        });
    }

    // Dropping a task over a column
    if (isActiveATask && isOverAColumn) {
        setTasks(tasks => {

            const updatedTasks = tasks.map(task => {
                if (task.id === activeId) {
                    return { ...task, columnId: overId };
                }
                return task;
            });

            createLog(activeId, `Dragged task "${active.data.current?.task.content}" from column "${columns.find(col => col.id === tasks.find(task => task.id === activeId)?.columnId)?.title || 'Unknown Column'}" to column "${over.data.current?.column.title || 'Unknown Column'}" at`, "dragEnd");

            return updatedTasks;
        });
    }
}


  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const {active, over} = event;

    if(!over) return;
    const activeId = active.id;
    const overId = over.id;

    if(activeId === overId) return;

    if (activeColumn) {
      createLog(activeId, `Dragged column "${active.data.current?.column.title}" to "${over.data.current?.column.title}" at`, "dragEnd");
    }

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(col => col.id === activeId);
      const overColumnIndex = columns.findIndex(col => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    })
  }

  return (
    <section className="m-auto relative flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[4rem]">
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
    </section>
  )
}

export default Kanban_Board