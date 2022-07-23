export class OrderCode {
    private readonly decimalPlaces = 8
    readonly value: string

    constructor(sequence: number, date: Date) {
        this.value = this.generate(sequence, date)
    }

    private generate(sequence: number, date: Date) {
        date.getFullYear()
        return `${date.getFullYear()}${sequence
            .toString()
            .padStart(this.decimalPlaces, '0')}`
    }
}
