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
    }: DiscountCoupon) {
        super({ id, createdAt, deletedAt, updatedAt })
        this.discountPercentage = discountPercentage
        this.name = name
    }
}
