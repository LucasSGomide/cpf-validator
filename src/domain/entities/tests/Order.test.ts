import { InvalidAttributeError } from '@domain/errors/InvalidAttributeError'
import { InvalidCpfError } from '@domain/errors/InvalidCpfError'
import { DiscountCoupon } from '../DiscountCoupon'
import { Order } from '../Order'
import { OrderItem } from '../OrderItem'
import { Product } from '../Product'

type SutTypes = {
    value?: string
    requestDate?: Date
}

const makeSut = ({ value, requestDate }: SutTypes) =>
    new Order({ cpf: value || '473.491.640-33', requestDate })

type MakeBaseOrderTypes = {
    firstItem: OrderItem
    secondItem: OrderItem
}

const makeBaseOrder = (): MakeBaseOrderTypes => {
    const firstProduct = new Product({
        id: 'any_first_product_id',
        name: 'any_first_product',
        price: 10,
        description: 'any_description',
    })
    const secondProduct = new Product({
        id: 'any_second_product_id',
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

    return { firstItem, secondItem }
}

describe('Order', () => {
    it('Não deve criar um pedido com CPF inválido', () => {
        const cpf = '111.111.111-11'
        expect(() => new Order({ cpf })).toThrow(new InvalidCpfError())
    })

    it('Deve calcular corretamente o valor total de um pedido sem cupom de desconto', () => {
        const { firstItem, secondItem } = makeBaseOrder()
        const order = makeSut({})
        order.addItem(firstItem)
        order.addItem(secondItem)
        const price = order.getPrice()
        expect(price).toBe(1450)
    })

    it('Deve calcular corretamente o valor total de um pedido com cupom de desconto expirado', () => {
        const { firstItem, secondItem } = makeBaseOrder()
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

    it('Deve calcular corretamente o valor total de um pedido com cupom de desconto válido', () => {
        const { firstItem, secondItem } = makeBaseOrder()
        const discountCoupon = new DiscountCoupon({
            name: 'any',
            percentage: 10,
            expireDate: new Date('2022-08-01T10:00:00Z'),
        })
        const order = makeSut({ requestDate: new Date('2022-08-01T10:00:00Z') })
        order.addItem(firstItem)
        order.addItem(secondItem)
        order.addCoupon(discountCoupon)
        const price = order.getPrice()
        expect(price).toBe(1305)
    })

    it('Deve lançar InvalidAttributeError se um item do pedido possuir quantidade negativa', () => {
        const { firstItem } = makeBaseOrder()
        firstItem.quantity = -5
        const order = makeSut({})
        expect(() => order.addItem(firstItem)).toThrow(
            new InvalidAttributeError('quantity')
        )
    })

    it('Deve lançar InvalidAttributeError se um item do pedido for repetido', () => {
        const { firstItem, secondItem } = makeBaseOrder()
        const order = makeSut({})
        order.addItem(firstItem)
        order.addItem(secondItem)
        expect(() => order.addItem(firstItem)).toThrow(
            new InvalidAttributeError('orderItem')
        )
    })
})
