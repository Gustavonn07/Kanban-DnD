import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

interface Props {
    labels: string[];
    dataLabels: number[];
    colors: {
        background: string[],
        border: string[]
    };
}

const Chart_Pie = ({ labels, dataLabels, colors }: Props) => {
    
    const data = {
        labels: labels.map(label => label.charAt(0).toUpperCase() + label.slice(1)),
        datasets: [
            {
                data: dataLabels,
                backgroundColor: colors.background,
                borderColor: colors.border,
                borderWidth: 1,
                hoverOffset: 4 
            },
        ],
    };
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'left' as const,
                align: 'start' as const,
                labels: {
                    padding: 10
                }
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => {
                        const index = tooltipItem.dataIndex;
                        const label = labels[index];
                        const value = tooltipItem.raw;
                        return ` ${label.charAt(0).toUpperCase() + label.slice(1)}: ${value}`;
                    },
                },
            },
        },
        layout: {
            padding: 20,
        }
    };

    return (
        <Pie data={data} options={options}/>
    );
};

export default Chart_Pie;
