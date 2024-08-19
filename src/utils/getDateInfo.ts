export class getDateInfo {
    private date: Date;
    private day: string;
    private dayIndex: number;
    private month: number;
    private year: number;

    constructor() {
        this.date = new Date();
        this.day = this.date.getDate().toString().padStart(2, '0');
        this.dayIndex = this.date.getDay();
        this.month = this.date.getMonth();
        this.year = this.date.getFullYear();
    }

    getDateString(): string {
        return `${this.day}/${this.month}/${this.year}`;
    }

    getMonthName(): string {
        const monthNames: string[] = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[this.month];
    }

    getDayName(): string {
        const dayNames: string[] = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
            'Thursday', 'Friday', 'Saturday'
        ];
        return dayNames[this.dayIndex];
    }

    getDayNumber(): number {
        return Number(this.day);
    }

    getMonthNumber(): number {
        return this.month + 1;
    }

    getYearNumber(): number {
        return this.year;
    }
}
