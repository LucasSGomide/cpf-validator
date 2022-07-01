import { BaseEntity } from './BaseEntity'
import { OrderItem } from './OrderItem'
import { DiscountCoupon } from './DicountCoupon'

export class Order extends BaseEntity {
    number: number
    price: number
    freightPrice?: number
    taxPrice?: number
    subtotal?: number
    userId: string
    orderItems: OrderItem[]
    discountCoupon: DiscountCoupon

    constructor({
        id,
        createdAt,
        deletedAt,
        updatedAt,
        number,
        price,
        freightPrice,
        taxPrice,
        subtotal,
        orderItems,
        discountCoupon,
    }: Order) {
        super({ id, createdAt, deletedAt, updatedAt })
        this.number = number
        this.price = price
        this.freightPrice = freightPrice
        this.taxPrice = taxPrice
        this.subtotal = subtotal
        this.orderItems = orderItems.map((item) => new OrderItem(item))
        this.discountCoupon = new DiscountCoupon(discountCoupon)
    }
}
