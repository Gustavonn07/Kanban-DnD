export const inputs = [
    {
        label: "Task Title:",
        type: "text",
        classesInput: "",
        classesLabel: "",
        typeValue: "title",
        placeholder: "Enter the title"
    },
    {
        label: "Task Responsible:",
        type: "text",
        classesInput: "",
        classesLabel: "",
        typeValue: "respon",
        placeholder: "Enter the person responsible for the task"
    },
    {
        label: "Task Description:",
        limiteChar: 500,
        type: "textarea",
        classesInput: "",
        classesLabel: "",
        typeValue: "desc",
        placeholder: "Enter the description"
    }
];

export const options = [
    {
        text: "Low",
        class: "bg-emerald-400",
        typeValue: "priority"
    },
    {
        text: "Normal",
        class: "bg-amber-300",
        typeValue: "priority"
    },
    {
        text: "Urgent",
        class: "bg-rose-500",
        typeValue: "priority"
    }
];