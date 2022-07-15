import { InvalidAttributeError } from '@domain/errors/InvalidAttributeError'

export class Dimension {
    length: number
    height: number
    width: number

    constructor({ length, height, width }) {
        this.length = length
        this.height = height
        this.width = width
        this.validate()
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

    public getDensity(weight: number) {
        return Math.round(weight / this.getVolume())
    }

    private validate() {
        if (this.length < 0 || this.height < 0 || this.width < 0) {
            throw new InvalidAttributeError('dimension')
        }
    }
}
