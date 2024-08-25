import Chart_Bar from "./chart/Chart_Bar";
import Chart_Pie from "./chart/Chart_Pie";
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
            <ul className="flex gap-5 px-5 overflow-hidden items-center h-full">
                <li className="w-1/2 h-5/6">
                <h2 className="flex justify-center items-center w-full py-3 text-4xl font-semibold">Gráficos</h2>
                    <Chart_Pie
                        labels={['batata', 'feijao', 'arroz', 'bacon']}
                        dataLabels={[12, 4, 32, 9]}
                        colors={{
                            background: [
                            '#ff638470',
                            '#36a2eb70',
                            '#ffce5670',
                            '#4bc0c070',
                            ],
                            border: [
                            '#ff6384',
                            '#36a2eb',
                            '#ffce56',
                            '#4bc0c0',
                            ]
                        }}
                    />
                </li>
                <li className="w-1/2 h-5/6 flex flex-col justify-between items-center bg-gray-200 rounded-md p-8 shadow-xl shadow-[#00000090]">
                <h2 className="flex justify-center items-center w-full text-4xl text-mainBackgroundColor font-semibold">Gráficos</h2>
                    <Chart_Bar
                        labels={['Jan', 'Feb', 'Mar', 'Apr']}
                        dataLabels={[10, 20, 30, 40]}
                        colors={{
                            background: [
                            '#ff638470',
                            '#36a2eb70',
                            '#ffce5670',
                            '#4bc0c070',
                            ],
                            border: [
                            '#ff6384',
                            '#36a2eb',
                            '#ffce56',
                            '#4bc0c0',
                            ]
                        }}
                    />
                </li>
            </ul>
        </div>
    </section>
  )
}

export default Kanban_Graphics