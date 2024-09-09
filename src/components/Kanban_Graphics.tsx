import { Column, Task } from "../types";
import { Colors } from "../utils/classes/getColors";
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

    const Color = new Colors();

    const tasksByColumn = columns.map(column => {
        const count = tasks.filter(task => task.columnId === column.id).length;
        return { label: column.title, count };
    });

    const pieLabels = tasksByColumn.map(item => item.label);
    const pieData = tasksByColumn.map(item => item.count);
    const colors = Color.getChartColors(pieLabels.length);
    return (
        <Kanban_Modal
            setOpenModal={setOpenGraphicsModal}
            classDiv="sm:w-10/12 w-full"
        >
            <ul className="flex gap-5 px-5 sm:overflow-hidden overflow-auto items-center h-full">
                <li className="w-1/2 min-w-[30rem] h-5/6">
                <h2 className="flex justify-center items-center w-full py-3 text-4xl font-semibold">Tasks per columns</h2>
                    <Chart_Pie
                        labels={pieLabels}
                        dataLabels={pieData}
                        colors={colors}
                    />
                </li>
                <li className="w-1/2 min-w-[30rem] h-5/6 flex flex-col justify-between items-center bg-gray-200 rounded-md p-8 shadow-xl shadow-[#00000090]">
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