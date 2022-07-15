import { InvalidAttributeError } from '@domain/errors/InvalidAttributeError'
import { BaseEntity, Dimension } from '@domain/entities'

export class Product extends BaseEntity {
    name: string
    price: number
    description: string
    weight?: number
    dimension?: Dimension

    constructor({
        id,
        createdAt,
        deletedAt,
        updatedAt,
        name,
        price,
        description,
        weight,
        dimension,
    }: ProductTypes) {
        super({ id, createdAt, deletedAt, updatedAt })
        this.name = name
        this.price = price
        this.description = description
        this.weight = weight
        this.dimension = dimension ? new Dimension(dimension) : undefined
        this.validate()
    }

    public getFreight() {
        return this.calculatesFreight()
    }

    private calculatesFreight(): number {
        if (!this.dimension) return 0
        const volume = this.dimension.getVolume()
        const density = this.dimension.getDensity(this.weight)
        return 1000 * volume * (density / 100)
    }

    private validate() {
        if (this.weight < 0) throw new InvalidAttributeError('weight')
    }
}

type ProductTypes = {
    id?: string
    createdAt?: Date
    deletedAt?: Date
    updatedAt?: Date
    name: string
    price: number
    description: string
    weight?: number
    dimension?: Dimension
}
