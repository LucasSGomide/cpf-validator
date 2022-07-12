import { DiscountCoupon } from '../DiscountCoupon'

describe('DiscountCoupon', () => {
    it('Deve instanciar um novo cupom de desconto', () => {
        const sut = new DiscountCoupon({
            discountPercentage: 10,
            name: 'any_name',
        })
        expect(sut).toBeDefined()
    })
})
