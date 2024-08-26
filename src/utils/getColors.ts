const baseColors = [
    '#ff6384',
    '#36a2eb',
    '#ffce56',
    '#4bc0c0',
    '#ae4bc0',
    '#4bc05f',
    '#6c4bc0',
    '#99c04b',
];

export const getColors = (numColors: number) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        colors.push(baseColors[i % baseColors.length]);
    }
    return {
        background: colors.map(color => `${color}70`),
        border: colors
    };
};