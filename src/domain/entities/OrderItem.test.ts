import { OrderItem } from './OrderItem'
import { Product } from './Product'

describe('OrderItem', () => {
    it('Deve calcular corretamente o valor de um produto', () => {
        const product = new Product({
            name: 'any_name',
            price: 10,
            description: 'any_description',
        })
        const orderItem = new OrderItem({ quantity: 100, product })

        const price = orderItem.getPrice()

        expect(price).toBe(1000)
    })
})
