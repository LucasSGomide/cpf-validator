import { InvalidAttributeError } from '@domain/errors/InvalidAttributeError'
import { Product } from '../Product'

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
})
