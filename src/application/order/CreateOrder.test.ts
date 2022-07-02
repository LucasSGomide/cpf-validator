import { IOrderRepository, IOrderItemRepository } from '@domain/repository'
import {
    makeCreatedOrderItemMock,
    makeNewOrderItemMock,
    makeOrderItemRepositoryMock,
} from '@application/order-item/mocks'
import {
    makeCreatedOrderMock,
    makeNewOrderMock,
    makeOrderRepositoryMock,
} from '@application/order/mocks'
import { Order } from '@domain/entities/Order'
import { CreateOrder } from './CreateOrder'

type SutTypes = {
    orderRepository: IOrderRepository
    orderItemRepository: IOrderItemRepository
    sut: CreateOrder
}

const makeSut = (): SutTypes => {
    const orderRepository = makeOrderRepositoryMock()
    const orderItemRepository = makeOrderItemRepositoryMock()

    return {
        orderRepository,
        orderItemRepository,
        sut: new CreateOrder(orderRepository, orderItemRepository),
    }
}

type MakeOrderMocksTypes = {
    newOrderMock: Order
    createdOrderMock: Order
}

const makeOrderMocks = (numberOfItems = 1): MakeOrderMocksTypes => {
    const newOrderMock = makeNewOrderMock({
        number: 1,
        price: 1,
        userId: 'any_user_id',
        orderItems: new Array(numberOfItems).fill(
            makeNewOrderItemMock({ quantity: 1 })
        ),
    })

    const createdOrderMock = makeCreatedOrderMock({
        ...newOrderMock,
        orderItems: newOrderMock.orderItems.map((item) =>
            makeCreatedOrderItemMock(item)
        ),
    })

    return {
        newOrderMock,
        createdOrderMock,
    }
}

describe('CreateOrder', () => {
    test('Deve criar um novo pedido', async () => {
        const { newOrderMock, createdOrderMock } = makeOrderMocks()
        const { sut, orderRepository } = makeSut()
        const createdOrder = await sut.execute(newOrderMock)
        expect(orderRepository.create).toBeCalledTimes(1)
        expect(orderRepository.create).toBeCalledWith(newOrderMock)
        expect(createdOrder).toEqual(createdOrderMock)
    })

    test('Deve criar os itens do pedido', async () => {
        const { newOrderMock, createdOrderMock } = makeOrderMocks()
        const { sut, orderItemRepository } = makeSut()
        const createdOrder = await sut.execute(newOrderMock)
        expect(orderItemRepository.create).toBeCalledTimes(1)
        expect(orderItemRepository.create).toBeCalledWith(
            newOrderMock.orderItems[0]
        )
        expect(createdOrder).toEqual(createdOrderMock)
    })

    test('Deve criar um pedido com mais de um item', async () => {
        const { newOrderMock, createdOrderMock } = makeOrderMocks(3)
        const { sut, orderItemRepository } = makeSut()
        const createdOrder = await sut.execute(newOrderMock)
        expect(orderItemRepository.create).toBeCalledTimes(3)
        expect(createdOrder).toEqual(createdOrderMock)
    })
})
