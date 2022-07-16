import { OrderItem } from '@domain/entities'

describe('OrderItem', () => {
    it('Deve calcular corretamente o valor de um produto', () => {
        const orderItem = new OrderItem('any_id_product', 10, 100)
        const price = orderItem.getPrice()
        expect(price).toBe(1000)
    })
})
