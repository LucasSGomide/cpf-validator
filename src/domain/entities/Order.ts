import { InvalidAttributeError } from '@domain/errors/InvalidAttributeError'
import { OrderItem } from './OrderItem'
import { DiscountCoupon } from './DiscountCoupon'
import { Cpf } from './Cpf'

export class Order {
    cpf: Cpf
    requestDate?: Date
    price?: number
    freightPrice?: number
    orderItems: OrderItem[]
    discountCoupon?: DiscountCoupon

    constructor({ cpf, requestDate }: OrderTypes) {
        this.orderItems = []
        this.cpf = new Cpf({ value: cpf })
        this.requestDate = requestDate || new Date()
    }

    public addItem(item: OrderItem) {
        if (item.quantity < 0) throw new InvalidAttributeError('quantity')
        if (this.isDuplicatedItem(item)) {
            throw new InvalidAttributeError('orderItem')
        }
        this.orderItems.push(
            new OrderItem({ quantity: item.quantity, product: item.product })
        )
    }

    public addCoupon(discountCoupon: DiscountCoupon) {
        this.discountCoupon = new DiscountCoupon(discountCoupon)
    }

    public getPrice() {
        const price = this.calculatesPrice()
        return price
    }

    private calculatesPrice(): number {
        let total: number = 0
        this.orderItems.forEach((item) => {
            total += item.getPrice()
        })
        if (this.discountCoupon) {
            if (this.discountCoupon.isExpired(this.requestDate)) {
                return total
            }
            return total - this.discountCoupon.getDiscount(total)
        }
        return total
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
