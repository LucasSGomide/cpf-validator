export class Dimension {
    length: number
    height: number
    width: number

    constructor({ length, height, width }) {
        this.length = length
        this.height = height
        this.width = width
    }

    public getVolume() {
        return parseFloat(
            (
                (this.length / 100) *
                (this.width / 100) *
                (this.height / 100)
            ).toFixed(3)
        )
    }
}
