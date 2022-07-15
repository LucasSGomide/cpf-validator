import { Product } from '@domain/entities'

export class OrderItem {
    private price: number
    quantity: number
    product: Product

    constructor({ quantity, product }: OrderItemTypes) {
        this.quantity = quantity
        this.product = new Product(product)
        this.price = this.calculatesPrice()
    }

    public getPrice() {
        return this.price
    }

    public getFreight() {
        return this.product.getFreight() * this.quantity
    }

    private calculatesPrice() {
        return this.quantity * this.product.price
    }
}

export type OrderItemTypes = {
    quantity: number
    product: Product
}
