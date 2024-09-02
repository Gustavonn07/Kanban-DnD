import { useState } from "react";
import { Id, Task } from "../types";
import Trash_icon from "./icons/Trash_icon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { twMerge } from "tailwind-merge";
import { Colors } from "../utils/classes/getColors";
import { truncateString } from "../utils/functions/getTruncateString";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: { title: string; desc: string; respon: string; priority: string }) => void;
}

// Criar forma de editar

function Kanban_Task({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(task.content);
  const Color = new Colors();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      updateTask(task.id, content);
      toggleEditMode();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(prev => ({ ...prev, title: e.target.value }));
  };

  const { 
    setNodeRef, 
    attributes, 
    listeners, 
    transform, 
    transition, 
    isDragging 
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  function toggleEditMode() {
    setEditMode(prev => !prev);
    setMouseIsOver(false);
    if (!editMode) {
      setContent(task.content);
    }
  }

  if (isDragging) {
    return (
      <li
        ref={setNodeRef}
        style={style}
        className="bg-mainBackgroundColor p-2.5 h-[10rem] min-h-[10rem] items-center flex text-left rounded-xl border-2 border-rose-500 duration-150 cursor-grab text-xl relative opacity-30"
      />
    );
  }

  if (editMode) {
    return (
      <li
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-mainBackgroundColor p-2.5 h-[10rem] min-h-[10rem] items-center flex flex-col text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 duration-150 cursor-grab text-xl relative"
      >
        <p className="p-2 opacity-40">Press enter + shift to save</p>
        <textarea
          className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
          value={content.title}
          placeholder="Task content here."
          autoFocus
          onBlur={() => {
            if (editMode) {
              updateTask(task.id, content);
              toggleEditMode();
            }
          }}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      </li>
    );
  }

  return (
    <li
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      onClick={toggleEditMode}
      className={twMerge("bg-mainBackgroundColor p-2.5 h-[12.5rem] min-h-[10rem] items-center flex text-left rounded ring-2 hover:ring-inset hover:ring-violet-500 duration-150 cursor-grab text-xl relative", Color.getPriorityColors(content.priority))}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <article className="flex flex-col justify-between h-full w-full p-2 overflow-y-auto overflow-x-hidden whitespace-normal">
        <h5 className="text-2xl font-semibold">{content.title}</h5>
        <p className="">{truncateString(content.desc, 50)}</p>

        <div className="flex justify-between">
          <p className="text-lg">Responsible: {content.respon}</p>
          <p className="text-lg">Priority: {content.priority}</p>
        </div>
      </article>

      {mouseIsOver && (
        <button 
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded-lg opacity-60 hover:opacity-100"
          onClick={() => deleteTask(task.id)}
        >
          <Trash_icon />
        </button>
      )}
    </li>
  );
}

export default Kanban_Task;