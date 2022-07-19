export class GenerateOrderCode {
    private readonly decimalPlaces = 8

    constructor(
        readonly orderNumber: number,
        readonly date: Date = new Date()
    ) {}

    getCode() {
        this.date.getFullYear()
        return `${this.date.getFullYear()}${this.orderNumber
            .toString()
            .padStart(this.decimalPlaces, '0')}`
    }
}
