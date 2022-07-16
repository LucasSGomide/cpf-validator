import { BaseEntity, Dimension } from '@domain/entities'

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
        return this.calculatesFreight()
    }

    private calculatesFreight(): number {
        if (!this.dimension) return 0
        const volume = this.dimension.getVolume()
        const density = this.dimension.getDensity()
        return 1000 * volume * (density / 100)
    }
}
