export class DiscountCoupon {
    percentage: number
    name: string
    expireDate?: Date

    constructor({ percentage, expireDate, name }: DiscountCouponTypes) {
        this.percentage = percentage
        this.name = name
        this.expireDate = expireDate
    }

    public getDiscount(total: number) {
        const discount = this.calculatesDiscount(total)
        return discount
    }

    isExpired(date: Date): boolean {
        return this.expireDate.getTime() < date.getTime()
    }

    private calculatesDiscount(total: number) {
        return total * (this.percentage / 100)
    }
}

type DiscountCouponTypes = {
    expireDate?: Date
    percentage: number
    name: string
}
