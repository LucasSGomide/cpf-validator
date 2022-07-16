import { Product, Dimension } from '@domain/entities'

describe('Product', () => {
    it('Deve calcular corretamente o preço do frete de um produto', () => {
        const product = new Product(
            'any_id',
            'any_name',
            'any_description',
            10,
            new Dimension(20, 15, 10, 1)
        )
        const freight = product.getFreight()
        expect(freight).toBe(9.99)
    })
})
