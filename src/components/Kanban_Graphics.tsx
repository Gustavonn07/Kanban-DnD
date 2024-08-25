import Close_Icon from "./icons/Close_Icon";

interface Props {
    setOpenGraphicsModal: (openGraphicsModal: boolean) => void;
}

function Kanban_Graphics({ setOpenGraphicsModal }: Props) {

  return (
    <section 
        onClick={() => setOpenGraphicsModal(false)}
        className="absolute left-0 w-full h-screen flex justify-center items-center bg-[#00000080]"
    >
        <div
            onClick={(e) => e.stopPropagation()}
            className="w-10/12 relative stroke-2 h-[90vh] rounded shadow-md shadow-[#00000060] bg-mainBackgroundColor"
        >
            <button 
                onClick={() => setOpenGraphicsModal(false)}
                className="absolute top-4 right-6 hover:bg-rose-500 rounded cursor-pointer duration-150"
            >
                <Close_Icon/>
            </button>

            <ul className="flex flex-col gap-6 overflow-y-auto h-full w-2/3 p-10">
                
            </ul>

        </div>
    </section>
  )
}

export default Kanban_Graphics