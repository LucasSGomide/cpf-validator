import { DiscountCoupon } from '../DiscountCoupon'

describe('DiscountCoupon', () => {
    it('Deve calcular corretamente o valor do desconto', () => {
        const sut = new DiscountCoupon({
            percentage: 10,
            name: 'any_name',
            expireDate: new Date('2022-07-12T10:00:00Z'),
        })
        const discount = sut.getDiscount(1000)
        expect(discount).toBe(100)
    })

    it('Deve retornar desconto igual a 0 se o percentual de desconto for 0', () => {
        const sut = new DiscountCoupon({
            percentage: 0,
            name: 'any_name',
        })
        const discount = sut.getDiscount(1000)
        expect(discount).toBe(0)
    })

    it('Deve retornar true se o cupom estiver expirado', () => {
        const sut = new DiscountCoupon({
            percentage: 10,
            name: 'any_name',
            expireDate: new Date('2022-06-01T10:00:00Z'),
        })
        const isExpired = sut.isExpired(new Date('2022-07-01T10:00:00Z'))
        expect(isExpired).toBeTruthy()
    })
})
