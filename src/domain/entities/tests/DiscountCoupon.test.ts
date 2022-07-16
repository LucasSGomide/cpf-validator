import { DiscountCoupon } from '../DiscountCoupon'

type SutParams = {
    percentage: number
    name: string
    expireDate: Date
}

function makeSut({ percentage, name, expireDate }: SutParams) {
    const sut = new DiscountCoupon(name, percentage, expireDate)
    return { sut }
}

describe('DiscountCoupon', () => {
    it('Deve calcular corretamente o valor do desconto', () => {
        const expireDate = new Date('2022-07-12T10:00:00Z')
        const coupon = { percentage: 10, name: 'any_name', expireDate }
        const { sut } = makeSut(coupon)
        const discount = sut.getDiscount(1000)
        expect(discount).toBe(100)
    })

    it('Deve retornar desconto igual a 0 se o percentual de desconto for 0', () => {
        const expireDate = new Date()
        const coupon = { percentage: 0, name: 'any_name', expireDate }
        const { sut } = makeSut(coupon)
        const discount = sut.getDiscount(1000)
        expect(discount).toBe(0)
    })

    it('Deve retornar true se o cupom estiver expirado', () => {
        const expireDate = new Date('2022-06-01T10:00:00Z')
        const coupon = { percentage: 10, name: 'any_name', expireDate }
        const { sut } = makeSut(coupon)
        const isExpired = sut.isExpired(new Date('2022-07-01T10:00:00Z'))
        expect(isExpired).toBeTruthy()
    })
})
