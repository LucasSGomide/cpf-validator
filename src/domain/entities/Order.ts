import { InvalidAttributeError } from '@domain/errors/InvalidAttributeError'
import { OrderItem } from './OrderItem'
import { DiscountCoupon } from './DiscountCoupon'
import { Cpf } from './Cpf'

export class Order {
    private minFreight = 10
    cpf: Cpf
    orderItems: OrderItem[]
    discountCoupon?: DiscountCoupon

    constructor(cpf: string, readonly requestDate = new Date()) {
        this.orderItems = []
        this.cpf = new Cpf({ value: cpf })
        this.requestDate = requestDate || new Date()
    }

    public addItem(item: OrderItem) {
        if (this.isDuplicatedItem(item)) {
            throw new InvalidAttributeError('orderItem')
        }
        this.orderItems.push(
            new OrderItem({ quantity: item.quantity, product: item.product })
        )
    }

    public addCoupon(discountCoupon: DiscountCoupon) {
        if (discountCoupon.isExpired(this.requestDate)) return
        this.discountCoupon = new DiscountCoupon(discountCoupon)
    }

    public getPrice() {
        const price = this.calculatesPrice() + this.calculatesFreight()
        return price
    }

    private calculatesPrice(): number {
        let total: number = 0
        this.orderItems.forEach((item) => {
            total += item.getPrice()
        })
        if (this.discountCoupon) {
            return total - this.discountCoupon.getDiscount(total)
        }
        return total
    }

    private calculatesFreight(): number {
        let total: number = 0
        this.orderItems.forEach((item) => {
            total += item.getFreight()
        })
        return total > this.minFreight ? total : this.minFreight
    }

    private isDuplicatedItem(item: OrderItem): boolean {
        return this.orderItems.some(
            (orderItem) => orderItem.product.id === item.product.id
        )
    }
}

export type OrderTypes = {
    cpf: string
    requestDate?: Date
}
