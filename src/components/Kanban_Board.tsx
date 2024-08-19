import { useMemo, useState } from "react"
import { Column, Id, Task } from "../types";
import { generateId } from "../utils/generateId";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import Plus_Icon from "./icons/Plus_Icon"
import Kanban_Column from "./Kanban_Column";
import { createPortal } from "react-dom";

function Kanban_Board() {

  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // define a distancia de arrasto inicial para ele considerar que é um drag-event em 3px
        distance: 3, 
      }
    })
  )

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId('task'),
      columnId,
      content: `Task ${tasks.length + 1}`
    }

    setTasks([...tasks, newTask])
  }

  function deleteTask(id: Id) {
    const filtredTasks = tasks.filter(task => task.id !== id);
    setTasks(filtredTasks);
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId('column'),
      title: `Column ${columns.length + 1}`
    }

    setColumns([...columns, columnToAdd])
  }
  
  function deleteColumn(id: Id) {
    const filtredColumns = columns.filter(col => col.id !== id);
    setColumns(filtredColumns);
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map(col => {
      if(col.id !== id) return col;
      return {...col, title}
    });

    setColumns(newColumns);
  }

  function onDragStart(event: DragStartEvent) {
    if(event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current?.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const {active, over} = event;

    if(!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;

    if(activeColumnId === overColumnId) return;
    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(col => col.id === activeColumnId);
      const overColumnIndex = columns.findIndex(col => col.id === overColumnId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  return (
    <section className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[4rem]">
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensors}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <Kanban_Column
                  column={col}
                  key={col.id}
                  updateColumn={updateColumn}
                  deleteColumn={deleteColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  tasks={tasks.filter(tasks => tasks.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>

          <button
            onClick={() => createNewColumn()}
            className="h-[6rem] w-[35rem] min-w-[35rem] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor ring-rose-500 hover:ring-2 duration-150 text-xl p-4 flex gap-2"
          >
            <Plus_Icon />
            Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
                {activeColumn && (
                  <Kanban_Column 
                    deleteTask={deleteTask} 
                    createTask={createTask} 
                    column={activeColumn} 
                    deleteColumn={deleteColumn} 
                    updateColumn={updateColumn} 
                    tasks={tasks.filter(tasks => tasks.columnId === activeColumn.id)}/>
                )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </section>
  )
}

export default Kanban_Board