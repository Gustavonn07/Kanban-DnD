import { Column, Task } from "../types";
import { getColors } from "../utils/getColors";
import Chart_Bar from "./chart/Chart_Bar";
import Chart_Pie from "./chart/Chart_Pie";
import Kanban_Modal from "./Kanban_Modal";

interface Props {
    setOpenGraphicsModal: (openGraphicsModal: boolean) => void;
    columns: Column[];
    tasks: Task[];
    tasksPerMonth: number[];
    months: string[];
}

function Kanban_Graphics({ setOpenGraphicsModal, columns, tasks, tasksPerMonth, months }: Props) {

    const tasksByColumn = columns.map(column => {
        const count = tasks.filter(task => task.columnId === column.id).length;
        return { label: column.title, count };
    });

    const pieLabels = tasksByColumn.map(item => item.label);
    const pieData = tasksByColumn.map(item => item.count);
    const colors = getColors(pieLabels.length);
    return (
        <Kanban_Modal
            setOpenModal={setOpenGraphicsModal}
        >
            <ul className="flex gap-5 px-5 overflow-hidden items-center h-full">
                <li className="w-1/2 h-5/6">
                <h2 className="flex justify-center items-center w-full py-3 text-4xl font-semibold">Tasks per columns</h2>
                    <Chart_Pie
                        labels={pieLabels}
                        dataLabels={pieData}
                        colors={colors}
                    />
                </li>
                <li className="w-1/2 h-5/6 flex flex-col justify-between items-center bg-gray-200 rounded-md p-8 shadow-xl shadow-[#00000090]">
                    <h2 className="flex justify-center items-center w-full text-4xl text-mainBackgroundColor font-semibold">Tasks per month</h2>
                    <Chart_Bar
                        labels={months}
                        dataLabels={tasksPerMonth}
                        colors={colors}
                    />
                </li>
            </ul>
        </Kanban_Modal>
    )
}

export default Kanban_Graphics