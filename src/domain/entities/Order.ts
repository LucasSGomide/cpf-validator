import { InvalidAttributeError } from '@domain/errors/InvalidAttributeError'
import { OrderItem } from './OrderItem'
import { DiscountCoupon } from './DiscountCoupon'
import { Cpf } from './Cpf'
import { Product } from './Product'
import { OrderCode } from './OrderCode'

export class Order {
    protected freightPrice: number = 0
    protected cpf: Cpf
    protected orderItems: OrderItem[]
    protected discountCoupon?: DiscountCoupon
    protected code: OrderCode

    constructor(
        cpf: string,
        readonly requestDate = new Date(),
        readonly sequence = 1
    ) {
        this.orderItems = []
        this.cpf = new Cpf(cpf)
        this.requestDate = requestDate
        this.code = new OrderCode(sequence, requestDate)
    }

    public addItem(item: Product, quantity: number) {
        if (this.isDuplicatedItem(item)) {
            throw new InvalidAttributeError('orderItem')
        }
        this.freightPrice += item.getFreight() * quantity
        this.orderItems.push(new OrderItem(item.id, item.price, quantity))
    }

    public addCoupon(discountCoupon: DiscountCoupon) {
        if (discountCoupon.isExpired(this.requestDate)) return
        const { name, percentage, expireDate } = discountCoupon
        this.discountCoupon = new DiscountCoupon(name, percentage, expireDate)
    }

    public getCode() {
        return this.code.value
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
        total += this.freightPrice
        if (this.discountCoupon) {
            return total - this.discountCoupon.getDiscount(total)
        }
        return total
    }

    private isDuplicatedItem(product: Product): boolean {
        return this.orderItems.some(
            (orderItem) => orderItem.idProduct === product.id
        )
    }
}

export type OrderTypes = {
    cpf: string
    requestDate?: Date
}
