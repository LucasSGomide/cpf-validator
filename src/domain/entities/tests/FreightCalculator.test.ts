import { FreightCalculator, Dimension, Product } from '@domain/entities'

describe('FreightCalculator', () => {
    it('Deve calcular corretamente o valor de frete para um produto', () => {
        const product = new Product(
            'any_id',
            'any_name',
            'any_description',
            10,
            new Dimension(20, 15, 5, 1)
        )
        const freightPrice = FreightCalculator.calculate(product)
        expect(freightPrice).toBe(10)
    })

    it('Deve calcular corretamente o valor de frete para um que possui dimensões 0', () => {
        const product = new Product('any_id', 'any_name', 'any_description', 10)
        const freightPrice = FreightCalculator.calculate(product)
        expect(freightPrice).toBe(0)
    })
})
