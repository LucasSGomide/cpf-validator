import { BaseEntity } from './BaseEntity'
import { OrderItem } from './OrderItem'
import { DiscountCoupon } from './DicountCoupon'

export class Order extends BaseEntity {
    price?: number
    freightPrice?: number
    orderItems: OrderItem[]
    discountCoupon?: DiscountCoupon

    constructor({ id, createdAt, deletedAt, updatedAt }: OrderTypes) {
        super({ id, createdAt, deletedAt, updatedAt })
        this.orderItems = []
    }

    public addItem(item: OrderItem) {
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
}
