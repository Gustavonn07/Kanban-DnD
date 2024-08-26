import { Dispatch, SetStateAction } from "react";
import { Task } from "../types";
import { getDateInfo } from "../utils/getDateInfo";

interface Props {
    months: string[];
    tasks: Task[];
    setTasksPerMonth: Dispatch<SetStateAction<number[]>>;
}

export function useTasksPerMonth({ months, tasks, setTasksPerMonth }: Props) {
    const newTasksCountByMonth = months.map((_, index) =>
        tasks.filter(task => {
            const taskMonth = new Date(task.createdAt).getMonth();
            return taskMonth === index;
        }).length
    );

    setTasksPerMonth(prevTasksPerMonth => {
        const updatedTasksPerMonth = prevTasksPerMonth.map((_, index) =>
            newTasksCountByMonth[index] > prevTasksPerMonth[index] ? newTasksCountByMonth[index] : prevTasksPerMonth[index]
        );

        updatedTasksPerMonth[new getDateInfo().getMonthNumber() - 1] += 1;

        localStorage.setItem('tasksPerMonth', JSON.stringify(updatedTasksPerMonth));

        return updatedTasksPerMonth;
    });
}