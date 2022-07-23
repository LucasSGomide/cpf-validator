export class DiscountCoupon {
    constructor(
        readonly code: string,
        readonly percentage: number,
        readonly expireDate: Date
    ) {
        this.code = code
        this.percentage = percentage
        this.expireDate = new Date(expireDate)
    }

    public getDiscount(total: number) {
        const discount = this.calculatesDiscount(total)
        return discount
    }

    public isExpired(date: Date): boolean {
        return this.expireDate.getTime() < date.getTime()
    }

    private calculatesDiscount(total: number) {
        return total * (this.percentage / 100)
    }
}
