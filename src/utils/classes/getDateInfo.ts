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

    getCurrentTime(): string {
        
        const hours = this.date.getHours();
        const minutes = this.date.getMinutes();
        const seconds = this.date.getSeconds();
        
        // HH:MM:SS
        const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        return timeStr;
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

    getMonthsNames(): string[] {
        const monthNames: string[] = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return monthNames;
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

    getTimeRefactored(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
}
