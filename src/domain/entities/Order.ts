import { BaseEntity } from './BaseEntity'
import { OrderItem } from './OrderItem'
import { DiscountCoupon } from './DiscountCoupon'
import { Cpf } from './Cpf'

export class Order extends BaseEntity {
    price?: number
    cpf: Cpf
    freightPrice?: number
    orderItems: OrderItem[]
    discountCoupon?: DiscountCoupon

    constructor({ id, createdAt, deletedAt, updatedAt, cpf }: OrderTypes) {
        super({ id, createdAt, deletedAt, updatedAt })
        this.orderItems = []
        this.cpf = new Cpf({ value: cpf })
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
            return total - this.discountCoupon.getDiscount(total)
        }
        return total
    }
}

export type OrderTypes = {
    id?: string
    createdAt?: Date
    deletedAt?: Date
    updatedAt?: Date
    cpf: string
}
