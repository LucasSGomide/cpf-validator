import { BaseEntity } from './BaseEntity'
import { Product } from './Product'

export class OrderItem extends BaseEntity {
    orderId?: string
    quantity: number
    product: Product

    constructor({
        id,
        createdAt,
        deletedAt,
        updatedAt,
        orderId,
        quantity,
        product,
    }: OrderItem) {
        super({ id, createdAt, deletedAt, updatedAt })
        this.orderId = orderId
        this.quantity = quantity
        this.product = new Product(product)
    }
}

export type OrderItemTypes = {
    id?: string
    createdAt?: Date
    deletedAt?: Date
    updatedAt?: Date
    orderId?: string
    quantity: number
    product: Product
}
