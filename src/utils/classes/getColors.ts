export class Colors {

    baseChartColors = [
        '#ff6384',
        '#36a2eb',
        '#ffce56',
        '#4bc0c0',
        '#ae4bc0',
        '#4bc05f',
        '#6c4bc0',
        '#99c04b',
    ];
    
    getChartColors = (numColors: number) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            colors.push(this.baseChartColors[i % this.baseChartColors.length]);
        }
        
        return {
            background: colors.map(color => `${color}70`),
            border: colors
        };
    };

    getPriorityColors = (priority: string) => {
        if(priority == "Low") return "ring-emerald-600";
        if(priority == "Normal") return "ring-amber-600";
        if(priority == "Urgent") return "ring-rose-600";
    }
}