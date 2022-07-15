import { InvalidAttributeError } from '@domain/errors/InvalidAttributeError'
import { Product, Dimension } from '@domain/entities'

describe('Product', () => {
    it('Deve lançar erro se o peso do produto for negativo', () => {
        expect(
            () =>
                new Product({
                    name: 'any_name',
                    description: 'any_description',
                    price: 0,
                    weight: -1,
                })
        ).toThrow(new InvalidAttributeError('weight'))
    })

    it('Deve calcular corretamente o preço do frete de um produto', () => {
        const product = new Product({
            name: 'any_name',
            description: 'any_description',
            price: 10,
            weight: 1,
            dimension: new Dimension({ length: 20, height: 15, width: 10 }),
        })
        const freight = product.getFreight()
        expect(freight).toBe(9.99)
    })
})
