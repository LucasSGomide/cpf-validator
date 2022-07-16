import { BaseEntity, Dimension, FreightCalculator } from '@domain/entities'

export class Product extends BaseEntity {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly description: string,
        readonly price: number,
        readonly dimension = new Dimension(0, 0, 0, 0)
    ) {
        super({ id })
        this.name = name
        this.price = price
        this.description = description
        this.dimension = dimension
    }

    public getFreight() {
        return FreightCalculator.calculate(this)
    }

    getVolume() {
        return this.dimension.getVolume()
    }

    getDensity() {
        return this.dimension.getDensity()
    }
}
