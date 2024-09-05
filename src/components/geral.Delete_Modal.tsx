import { twMerge } from "tailwind-merge"
import Kanban_Modal from "./Kanban_Modal"

interface Props {
  content: string;
  handleDelete: () => void;
  close: (openModal: boolean) => void
  classModal?: string;
}

function Delete_Modal({ content, handleDelete, close, classModal }: Props) {

  return (
    <Kanban_Modal 
      setOpenModal={close}
      classDiv={twMerge("w-1/3 h-1/3 -translate-y-1/2 flex flex-col justify-center items-center gap-8", classModal)}
    >
      <h3 className="w-full text-center font-semibold text-4xl">{content}</h3>
      <div className="flex w-full justify-center pt-10 gap-5">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleDelete()
            close(false);
          }}
          className="mt-auto flex gap-2 items-center bg-gray-200 text-gray-950 border-gray-200 border-2 rounded-md py-4 justify-center w-64 hover:bg-emerald-400 hover:border-emerald-400 hover:text-gray-200 active:bg-black duration-150 text-xl font-semibold stroke-2"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            close(false);
          }}
          className="mt-auto flex gap-2 items-center border-gray-200 border-2 rounded-md py-4 justify-center w-64 hover:bg-rose-500 hover:border-rose-500 hover:text-gray-200 active:bg-black duration-150 text-xl font-semibold stroke-2"
        >
          Cancel
        </button>
      </div>
    </Kanban_Modal>
  )
}

export default Delete_Modal