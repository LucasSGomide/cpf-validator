import { InvalidCpfError } from '@domain/errors/InvalidCpfError'
import { DiscountCoupon } from '../DiscountCoupon'
import { Order } from '../Order'
import { OrderItem } from '../OrderItem'
import { Product } from '../Product'

type SutTypes = {
    value?: string
}

const makeSut = ({ value }: SutTypes) =>
    new Order({ cpf: value || '473.491.640-33' })

describe('Order', () => {
    it('Não deve criar um pedido com CPF inválido', () => {
        const cpf = '111.111.111-11'
        expect(() => new Order({ cpf })).toThrow(new InvalidCpfError())
    })

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
        const order = makeSut({})
        order.addItem(firstItem)
        order.addItem(secondItem)
        const price = order.getPrice()
        expect(price).toBe(1450)
    })

    it('Deve calcular corretamente o valor total de um pedido com cupom de desconto expirado', () => {
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
            percentage: 10,
            expireDate: new Date('2022-05-01T10:00:00Z'),
        })
        const order = makeSut({})
        order.addItem(firstItem)
        order.addItem(secondItem)
        order.addCoupon(discountCoupon)
        const price = order.getPrice()
        expect(price).toBe(1450)
    })
})
