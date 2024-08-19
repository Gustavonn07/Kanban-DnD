export class getDateInfo {
    private date: Date;
    private day: number;
    private monthIndex: number;
    private dayIndex: number;
    private year: number;

    constructor() {
        this.date = new Date();
        this.day = this.date.getDate();
        this.monthIndex = this.date.getMonth();
        this.dayIndex = this.date.getDay();
        this.year = this.date.getFullYear();
    }

    getDateString(): string {
        const day = this.day.toString().padStart(2, '0');
        const month = (this.monthIndex + 1).toString().padStart(2, '0');
        return `${day}/${month}/${this.year}`;
    }

    getMonthName(): string {
        const monthNames: string[] = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[this.monthIndex];
    }

    getDayName(): string {
        const dayNames: string[] = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
            'Thursday', 'Friday', 'Saturday'
        ];
        return dayNames[this.dayIndex];
    }

    getDayNumber(): number {
        return this.day;
    }

    getMonthNumber(): number {
        return this.monthIndex + 1;
    }

    getYearNumber(): number {
        return this.year;
    }
}
