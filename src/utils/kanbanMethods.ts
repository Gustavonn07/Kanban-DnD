
import { arrayMove } from "@dnd-kit/sortable";
import { generateKey } from "../utils/generateKey.ts";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { generateId } from "../utils/generateId.ts";
import { getDateInfo } from "../utils/getDateInfo.ts";
import { toast } from "sonner";
import { truncateString } from "../utils/truncateString.ts";
import { Column, Id, Log, Task } from "../types.ts";

interface Props {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  logs: Log[];
  setLogs: React.Dispatch<React.SetStateAction<Log[]>>;
  setActiveColumn: React.Dispatch<React.SetStateAction<Column | null>>;
  activeColumn: Column | null;
  setActiveTask: React.Dispatch<React.SetStateAction<Task | null>>;
}

export const KanbanMethods = ({
  columns,
  setColumns,
  tasks,
  setTasks,
  logs,
  setLogs,
  setActiveColumn,
  activeColumn,
  setActiveTask
}: Props) => {

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
  
    function createTask(columnId: Id, content: { title: string; desc: string; respon: string; priority: string }) {
      const newTask: Task = {
          id: generateKey(),
          columnId,
          content: {
              title: content.title,
              desc: content.desc,
              priority: content.priority,
              respon: content.respon
          },
          createdAt: `${new getDateInfo().getMonthNumber()}`
      };
  
      createLog(newTask.columnId, newTask.content.title, "createTask", '', newTask.id);
  
      setTasks([...tasks, newTask]);
      toast.success('A new Task has been created');
  }
  
    function deleteTask(id: Id) {
      const deletedTask = tasks.find(task => task.id === id);
  
      if (deletedTask) {
        const filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
  
        createLog(deletedTask.columnId, deletedTask.content.title, "deleteTask", '', deletedTask.id);
        toast.success(`Task ${truncateString(deletedTask.content.title, 12)} has been deleted`);
      }
    }
  
    function updateTask(id: Id, content: { title: string; desc: string; respon: string; priority: string }) {
      const prevContent = tasks.find(task => task.id === id)?.content;
      const newTasks = tasks.map(task => {
        if (task.id !== id) return task;
        return { 
          ...task,
          content: {
            ...content
          }
        };
      });
      
      setTasks(newTasks);
    
      const updatedTask = newTasks.find(task => task.id === id);
      
      if (updatedTask) {
        createLog(updatedTask.columnId, updatedTask.content.title, "updateTask", prevContent?.title, updatedTask.id);
        toast.success(`Task ${truncateString(updatedTask.content.title, 12)} has been changed`);
      }
    }
  
    function createNewColumn() {
      const columnToAdd: Column = {
        id: generateKey(),
        title: `Column ${columns.length + 1}`
      }
  
      setColumns([...columns, columnToAdd]);
  
      createLog(columnToAdd.id, columnToAdd.title, "createColumn");
      
      toast.success('A new Column has been created');
    }
  
    function deleteColumn(id: Id) {
      const deletedColumn = columns.find(col => col.id === id);
  
      if (deletedColumn) {
        const filteredColumns = columns.filter(col => col.id !== id);
        setColumns(filteredColumns);
  
        const newTasks = tasks.filter(task => task.columnId !== id);
        setTasks(newTasks);
  
        createLog(id, `${columns.find(col => col.id === id)?.title}`, 'deletedColumn');
        toast.success(`Column ${truncateString(deletedColumn.title, 12)} has been deleted`);
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
        toast.success(`Column ${truncateString(updatedColumn.title, 12)} has been changed`);
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
  
              createLog(activeId, `Dragged task "${active.data.current?.task.content.title}" from column "${columns.find(col => col.id === tasks.find(task => task.id === activeId)?.columnId)?.title || 'Unknown Column'}" to task "${over.data.current?.task.content.title}" from column "${columns.find(col => col.id === tasks.find(task => task.id === overId)?.columnId)?.title}" at`, "dragEnd");
  
              toast.success(`The task ${truncateString(active.data.current?.task.content, 12)} has been dragged`);
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
  
              createLog(activeId, `Dragged task "${active.data.current?.task.content.title}" from column "${columns.find(col => col.id === tasks.find(task => task.id === activeId)?.columnId)?.title || 'Unknown Column'}" to column "${over.data.current?.column.title || 'Unknown Column'}" at`, "dragEnd");
              
              toast.success(`The task ${truncateString(active.data.current?.task.content, 12)} has been dragged`);
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
        toast.success(`The column ${truncateString(active.data.current?.column.title, 12)} has been dragged`);
      }
  
      setColumns(columns => {
        const activeColumnIndex = columns.findIndex(col => col.id === activeId);
        const overColumnIndex = columns.findIndex(col => col.id === overId);
  
        return arrayMove(columns, activeColumnIndex, overColumnIndex);
      })
    }
  
  return {
    createNewColumn,
    createTask,
    deleteColumn,
    deleteTask,
    onDragEnd,
    onDragOver,
    onDragStart,
    updateColumn,
    updateTask
  }
}
  