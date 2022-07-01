import { BaseEntity } from './BaseEntity'
import { OrderItem } from './OrderItem'
import { DiscountCoupon } from './DicountCoupon'

export class Order extends BaseEntity {
    number: number
    orderItems: OrderItem[]
    discountCoupon: DiscountCoupon

    constructor({
        id,
        createdAt,
        deletedAt,
        updatedAt,
        number,
        orderItems,
        discountCoupon,
    }: Order) {
        super({ id, createdAt, deletedAt, updatedAt })
        this.number = number
        this.orderItems = orderItems.map((item) => new OrderItem(item))
        this.discountCoupon = new DiscountCoupon(discountCoupon)
    }
}
