import { BaseEntity } from './BaseEntity'

export class DiscountCoupon extends BaseEntity {
    discountPercentage: number
    name: string

    constructor({
        id,
        createdAt,
        deletedAt,
        updatedAt,
        discountPercentage,
        name,
    }: DiscountCouponTypes) {
        super({ id, createdAt, deletedAt, updatedAt })
        this.discountPercentage = discountPercentage
        this.name = name
    }

    public getDiscount(total: number) {
        const discount = this.calculatesDiscount(total)
        return discount
    }

    private calculatesDiscount(total: number) {
        return total * (this.discountPercentage / 100)
    }
}

type DiscountCouponTypes = {
    id?: string
    createdAt?: Date
    deletedAt?: Date
    updatedAt?: Date
    discountPercentage: number
    name: string
}
