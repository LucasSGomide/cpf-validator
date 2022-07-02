import { BaseEntity } from './BaseEntity'

export class DiscountCoupon extends BaseEntity {
    discountPercentage: number

    constructor({
        id,
        createdAt,
        deletedAt,
        updatedAt,
        discountPercentage,
    }: DiscountCoupon) {
        super({ id, createdAt, deletedAt, updatedAt })
        this.discountPercentage = discountPercentage
    }
}
