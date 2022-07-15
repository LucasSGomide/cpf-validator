import { Dimension, OrderItem, Product } from '@domain/entities'

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

    it('Deve calcular corretamente o preço do frete de um item do pedido', () => {
        const product = new Product({
            name: 'any_name',
            description: 'any_description',
            price: 10,
            weight: 1,
            dimension: new Dimension({ length: 20, height: 15, width: 10 }),
        })
        const orderItem = new OrderItem({ quantity: 100, product })
        const freight = orderItem.getFreight()
        expect(freight).toBe(999)
    })
})
