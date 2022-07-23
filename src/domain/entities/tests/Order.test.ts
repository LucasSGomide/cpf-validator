import { InvalidAttributeError } from '@domain/errors/InvalidAttributeError'
import { InvalidCpfError } from '@domain/errors/InvalidCpfError'
import { Order, DiscountCoupon, Product, Dimension } from '@domain/entities'

type SutTypes = {
    value?: string
    requestDate?: Date
    sequence?: number
}

const makeSut = ({ value, requestDate, sequence }: SutTypes) =>
    new Order(value || '473.491.640-33', requestDate, sequence)

type MakeBaseOrderParams = {
    firstDimension?: Dimension
    secondDimension?: Dimension
}

type MakeBaseOrderTypes = {
    firstProduct: Product
    secondProduct: Product
}

const makeBaseOrder = ({
    firstDimension,
    secondDimension,
}: MakeBaseOrderParams): MakeBaseOrderTypes => {
    const firstProduct = new Product(
        'any_first_product_id',
        'any_first_product',
        'any_description',
        10,
        firstDimension
    )
    const secondProduct = new Product(
        'any_second_product_id',
        'any_second_product',
        'any_description',
        15,
        secondDimension
    )

    return { firstProduct, secondProduct }
}

describe('Order', () => {
    it('Não deve criar um pedido com CPF inválido', () => {
        const cpf = '111.111.111-11'
        expect(() => new Order(cpf)).toThrow(new InvalidCpfError())
    })

    it('Deve calcular corretamente o valor total de um pedido sem cupom de desconto', () => {
        const { firstProduct, secondProduct } = makeBaseOrder({})
        const order = makeSut({})
        order.addItem(firstProduct, 100)
        order.addItem(secondProduct, 30)
        const price = order.getPrice()
        expect(price).toBe(1450)
    })

    it('Deve calcular corretamente o valor total de um pedido com cupom de desconto expirado', () => {
        const { firstProduct, secondProduct } = makeBaseOrder({})
        const expireDate = new Date('2022-05-01T10:00:00Z')
        const discountCoupon = new DiscountCoupon('any', 10, expireDate)
        const order = makeSut({})
        order.addItem(firstProduct, 100)
        order.addItem(secondProduct, 30)
        order.addCoupon(discountCoupon)
        const price = order.getPrice()
        expect(price).toBe(1450)
    })

    it('Deve calcular corretamente o valor total de um pedido com cupom de desconto válido', () => {
        const { firstProduct, secondProduct } = makeBaseOrder({})
        const expiredate = new Date('2022-08-01T10:00:00Z')
        const discountCoupon = new DiscountCoupon('any', 10, expiredate)
        const order = makeSut({ requestDate: new Date('2022-08-01T10:00:00Z') })
        order.addItem(firstProduct, 100)
        order.addItem(secondProduct, 30)
        order.addCoupon(discountCoupon)
        const price = order.getPrice()
        expect(price).toBe(1305)
    })

    it('Deve calcular corretamente o valor total de um pedido com frete', () => {
        const firstDimension = new Dimension(20, 15, 10, 1)
        const secondDimension = new Dimension(100, 30, 10, 3)
        const { firstProduct, secondProduct } = makeBaseOrder({
            firstDimension,
            secondDimension,
        })
        const order = makeSut({})
        order.addItem(firstProduct, 100)
        order.addItem(secondProduct, 30)
        const price = order.getPrice()
        expect(price).toBe(3350)
    })

    it('Deve calcular corretamente o valor total de um pedido com frete mínimo', () => {
        const firstDimension = new Dimension(20, 15, 10, 0.7)
        const { firstProduct } = makeBaseOrder({ firstDimension })
        const order = makeSut({})
        order.addItem(firstProduct, 1)
        const price = order.getPrice()
        expect(price).toBe(20)
    })

    it('Deve lançar InvalidAttributeError se um item do pedido possuir quantidade negativa', () => {
        const { firstProduct } = makeBaseOrder({})
        const order = makeSut({})
        expect(() => order.addItem(firstProduct, -5)).toThrow(
            new InvalidAttributeError('quantity')
        )
    })

    it('Deve lançar InvalidAttributeError se um item do pedido for repetido', () => {
        const { firstProduct, secondProduct } = makeBaseOrder({})
        const order = makeSut({})
        order.addItem(firstProduct, 10)
        order.addItem(secondProduct, 10)
        expect(() => order.addItem(firstProduct, 10)).toThrow(
            new InvalidAttributeError('orderItem')
        )
    })

    it('Deve gerar o código do pedido corretamente', () => {
        const order = makeSut({
            requestDate: new Date('2022-05-05T00:00:00'),
            sequence: 2,
        })
        const code = order.getCode()
        expect(code).toBe('202200000002')
    })
})
