import { DiscountCoupon } from '../DiscountCoupon'

describe('DiscountCoupon', () => {
    it('Deve calcular corretamente o valor do desconto', () => {
        const sut = new DiscountCoupon({
            discountPercentage: 10,
            name: 'any_name',
        })
        const discount = sut.getDiscount(1000)
        expect(discount).toBe(100)
    })
})
