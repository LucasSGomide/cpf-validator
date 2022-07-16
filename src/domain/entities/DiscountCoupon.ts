export class DiscountCoupon {
    constructor(
        readonly name: string,
        readonly percentage: number,
        readonly expireDate: Date
    ) {
        this.name = name
        this.percentage = percentage
        this.expireDate = new Date(expireDate)
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
