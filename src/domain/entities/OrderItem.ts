import { BaseEntity } from './BaseEntity'
import { Product } from './Product'

export class OrderItem extends BaseEntity {
    orderId: string
    quantity: number
    price: number
    product: Product

    constructor({
        id,
        createdAt,
        deletedAt,
        updatedAt,
        orderId,
        quantity,
        price,
        product,
    }: OrderItem) {
        super({ id, createdAt, deletedAt, updatedAt })
        this.orderId = orderId
        this.quantity = quantity
        this.price = price
        this.product = new Product(product)
    }
}
