import { DiscountCoupon } from './DicountCoupon'
import { Order } from './Order'
import { OrderItem } from './OrderItem'
import { Product } from './Product'

describe('Order', () => {
    it('Deve calcular corretamente o valor total de um pedido sem cupom de desconto', () => {
        const firstProduct = new Product({
            name: 'any_first_product',
            price: 10,
            description: 'any_description',
        })
        const secondProduct = new Product({
            name: 'any_second_product',
            price: 15,
            description: 'any_description',
        })
        const firstItem = new OrderItem({
            quantity: 100,
            product: firstProduct,
        })
        const secondItem = new OrderItem({
            quantity: 30,
            product: secondProduct,
        })
        const order = new Order({
            orderItems: [firstItem, secondItem],
            userId: 'any_user_id',
        })
        const price = order.getPrice()
        expect(price).toBe(1450)
    })

    it('Deve calcular corretamente o valor total de um pedido com cupom de desconto', () => {
        const firstProduct = new Product({
            name: 'any_first_product',
            price: 10,
            description: 'any_description',
        })
        const secondProduct = new Product({
            name: 'any_second_product',
            price: 15,
            description: 'any_description',
        })
        const firstItem = new OrderItem({
            quantity: 100,
            product: firstProduct,
        })
        const secondItem = new OrderItem({
            quantity: 30,
            product: secondProduct,
        })
        const discountCoupon = new DiscountCoupon({
            name: 'any',
            discountPercentage: 10,
        })
        const order = new Order({
            orderItems: [firstItem, secondItem],
            userId: 'any_user_id',
            discountCoupon,
        })
        const price = order.getPrice()
        expect(price).toBe(1305)
    })
})
