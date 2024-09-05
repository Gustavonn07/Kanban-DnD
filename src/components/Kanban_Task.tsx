import { useState } from "react";
import { Id, Task } from "../types";
import Trash_icon from "./icons/Trash_icon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { twMerge } from "tailwind-merge";
import { Colors } from "../utils/classes/getColors";
import Edit_Icon from "./icons/Edit_Icon";
import Form_Input from "./form/Form_Input";
import Form_Select from "./form/Form_Select";
import { inputs, options } from "./assets/tasks.inputs";
import { useModal } from "../hooks/useModal";
import Delete_Modal from "./geral.Delete_Modal";
import { truncateString } from "../utils/functions/getTruncateString";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: { title: string; desc: string; respon: string; priority: string }) => void;
}

function Kanban_Task({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(task.content);
  const Color = new Colors();
  
  const { openModal, open, close } = useModal();

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

  return (
    <>
      <li
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={twMerge(
          `bg-mainBackgroundColor p-2.5 ${editMode ? "h-[30rem]" : "active:h-[30rem] focus:h-[30rem] h-[12.5rem]"} flex text-left rounded ring-2 hover:ring-inset hover:ring-violet-500 duration-150 cursor-grab text-xl relative`, 
          Color.getPriorityColors(content.priority)
        )}
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
      >
        {editMode ? (
          <form className="flex flex-col justify-between h-full w-full p-2 overflow-y-auto overflow-x-hidden whitespace-normal">
            <p className="pb-4 opacity-40 text-center">Press the button "Save" to save</p>
            {inputs.map((input, index) => (
              <Form_Input
                key={index}
                id={index}
                typeValue={input.typeValue}
                setValue={setContent}
                value={content}
                label={input.label}
                limiteChar={input.limiteChar}
                type={input.type}
                classesInput={"text-lg"}
                classesLabel={"text-2xl"}
                placeholder={input.placeholder}
              />
            ))}

            <Form_Select 
              title="Priority:"
              options={options}
              setValue={setContent}
              classesSelect="text-xl"
              classesLabel="text-2xl"
              valueDefined={content.priority}
            />

            <div className="flex pt-10 gap-5">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  updateTask(task.id, content);
                  toggleEditMode();
                }}
                className="mt-auto flex gap-2 items-center border-gray-200 border-2 rounded-md py-4 justify-center w-64 hover:bg-emerald-400 hover:border-emerald-400 hover:text-gray-200 active:bg-black duration-150 text-xl font-semibold stroke-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  toggleEditMode();
                }}
                className="mt-auto flex gap-2 items-center border-gray-200 border-2 rounded-md py-4 justify-center w-64 hover:bg-rose-500 hover:border-rose-500 hover:text-gray-200 active:bg-black duration-150 text-xl font-semibold stroke-2"
              >
                Cancel
              </button>
            </div>
          </form>
          
        ) : (
          <article className="relative flex flex-col justify-between h-full w-full p-2 overflow-y-auto overflow-x-hidden whitespace-normal">
            <h5 className="text-2xl font-semibold">{truncateString(content.title, 26)}</h5>
            <p className="text-xl py-4 overflow-x-hidden overflow-y-auto">{content.desc}</p>
            <div className="flex justify-between">
              <p className="text-lg">Responsible: {truncateString(content.respon, 15)}</p>
              <p className="text-lg">Priority: {content.priority}</p>
            </div>
          </article>
        )}

        {mouseIsOver && !editMode && (
          <>
            <button
              className="stroke-white absolute right-4 top-10 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded-lg opacity-60 hover:opacity-100 hover:stroke-rose-600 duration-150"
              onClick={(e) => {
                open("deleteTask");
                e.stopPropagation();
              }}
            >
              <Trash_icon />
            </button>

            <button
              className="stroke-white absolute right-20 top-10 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded-lg opacity-60 hover:opacity-100 hover:stroke-amber-300 duration-150"
              onClick={(e) => {
                toggleEditMode();
                e.stopPropagation();
              }}
            >
              <Edit_Icon />
            </button>
          </>
        )}
      </li>
      
      {openModal === "deleteTask" && 
        <Delete_Modal 
          close={() => close()}
          content={`Do you wish to delete ${truncateString(task.content.title, 12)}?`}
          handleDelete={() => deleteTask(task.id)}
        />
      }
    </>
  );
}

export default Kanban_Task;