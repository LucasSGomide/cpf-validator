import { BaseEntity } from './BaseEntity'
import { Product } from './Product'

export class OrderItem extends BaseEntity {
    private price: number
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
    }: OrderItemTypes) {
        super({ id, createdAt, deletedAt, updatedAt })
        this.orderId = orderId
        this.quantity = quantity
        this.product = new Product(product)
        this.price = this.calculatesPrice()
    }

    public getPrice() {
        return this.price
    }

    private calculatesPrice() {
        return this.quantity * this.product.price
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
