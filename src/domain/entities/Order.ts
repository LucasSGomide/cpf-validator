import { BaseEntity } from './BaseEntity'
import { OrderItem } from './OrderItem'
import { DiscountCoupon } from './DicountCoupon'

export class Order extends BaseEntity {
    number?: number
    price?: number
    freightPrice?: number
    taxPrice?: number
    subtotal?: number
    userId: string
    orderItems: OrderItem[]
    discountCoupon?: DiscountCoupon

    constructor({
        id,
        createdAt,
        deletedAt,
        updatedAt,
        userId,
        number,
        price,
        freightPrice,
        taxPrice,
        subtotal,
        orderItems,
        discountCoupon,
    }: OrderTypes) {
        super({ id, createdAt, deletedAt, updatedAt })
        this.userId = userId
        this.number = number
        this.freightPrice = freightPrice
        this.taxPrice = taxPrice
        this.subtotal = subtotal
        this.orderItems = orderItems.map((item) => new OrderItem(item))
        this.discountCoupon = discountCoupon
            ? new DiscountCoupon(discountCoupon)
            : null
        this.price = price || this.calculatesPrice()
    }

    public getPrice() {
        return this.price
    }

    private calculatesPrice(): number {
        let total: number = 0
        this.orderItems.forEach((item) => {
            total += item.getPrice()
        })
        if (this.discountCoupon) {
            const { discountPercentage } = this.discountCoupon
            return (total * (100 - discountPercentage)) / 100
        }
        return total
    }
}

export type OrderTypes = {
    id?: string
    createdAt?: Date
    deletedAt?: Date
    updatedAt?: Date
    userId: string
    number?: number
    price?: number
    freightPrice?: number
    taxPrice?: number
    subtotal?: number
    orderItems: OrderItem[]
    discountCoupon?: DiscountCoupon
}
