import { InvalidAttributeError } from '@domain/errors/InvalidAttributeError'

export class Dimension {
    constructor(
        readonly length: number,
        readonly height: number,
        readonly width: number,
        readonly weight: number
    ) {
        this.length = length
        this.height = height
        this.width = width
        this.weight = weight
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

    public getDensity() {
        return Math.round(this.weight / this.getVolume())
    }

    private validate() {
        if (
            this.length < 0 ||
            this.height < 0 ||
            this.width < 0 ||
            this.weight < 0
        ) {
            throw new InvalidAttributeError('dimension')
        }
    }
}
