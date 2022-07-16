import { Product } from '@domain/entities'
import { InvalidAttributeError } from '@domain/errors/InvalidAttributeError'

export class OrderItem {
    constructor(
        readonly idProduct: string,
        readonly price: number,
        readonly quantity: number
    ) {
        this.quantity = quantity

        this.price = this.calculatesPrice()
        if (this.quantity < 0) throw new InvalidAttributeError('quantity')
    }

    public getPrice() {
        return this.price
    }

    private calculatesPrice() {
        return this.quantity * this.price
    }
}

export type OrderItemTypes = {
    quantity: number
    product: Product
}
