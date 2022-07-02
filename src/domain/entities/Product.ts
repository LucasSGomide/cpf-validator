import { BaseEntity } from './BaseEntity'

export class Product extends BaseEntity {
    name: string
    price: number
    description: string

    constructor({
        id,
        createdAt,
        deletedAt,
        updatedAt,
        name,
        price,
        description,
    }: Product) {
        super({ id, createdAt, deletedAt, updatedAt })
        this.name = name
        this.price = price
        this.description = description
    }
}
