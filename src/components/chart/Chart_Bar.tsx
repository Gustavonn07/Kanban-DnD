import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
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

function Chart_Bar({ labels, dataLabels, colors }: Props) {

  const data = {
    labels: labels.map(label => label.charAt(0).toUpperCase() + label.slice(1)),
    datasets: [
      {
        label: '',
        data: dataLabels,
        backgroundColor: colors.background,
        borderColor: colors.border,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
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
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Bar data={data} options={options} />
  );
}

export default Chart_Bar