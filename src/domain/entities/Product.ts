import { InvalidAttributeError } from '@domain/errors/InvalidAttributeError'
import { BaseEntity } from './BaseEntity'

export class Product extends BaseEntity {
    name: string
    price: number
    description: string
    weight?: number

    constructor({
        id,
        createdAt,
        deletedAt,
        updatedAt,
        name,
        price,
        description,
        weight,
    }: ProductTypes) {
        super({ id, createdAt, deletedAt, updatedAt })
        this.name = name
        this.price = price
        this.description = description
        this.weight = weight
        this.validate()
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
}
