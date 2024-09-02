export function truncateString(str: string | undefined, length: number | null) {
    if (typeof str !== 'string') {
        return '';
    }

    const maxLength = length ?? 0;

    if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...';
    } else {
        return str;
    }
}