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

describe('CreateOrder', () => {
    test('Deve criar um novo pedido', async () => {
        const { sut, orderRepository } = makeSut()
        const newOrderMock = makeNewOrderMock({
            number: 1,
            price: 1,
            userId: 'any_user_id',
            orderItems: [],
        })
        const createdOrderMock = makeCreatedOrderMock(newOrderMock)

        const createdOrder = await sut.execute(newOrderMock)
        expect(orderRepository.create).toBeCalledTimes(1)
        expect(orderRepository.create).toBeCalledWith(newOrderMock)
        expect(createdOrder).toEqual(createdOrderMock)
    })

    test('Deve criar os itens do pedido', async () => {
        const newOrderItemMock = makeNewOrderItemMock({ quantity: 1 })
        const newOrderMock = makeNewOrderMock({
            number: 1,
            price: 1,
            userId: 'any_user_id',
            orderItems: [newOrderItemMock],
        })
        const createdOrderMock = makeCreatedOrderMock({
            ...newOrderMock,
            orderItems: [makeCreatedOrderItemMock(newOrderItemMock)],
        })

        const { sut, orderItemRepository } = makeSut()
        const createdOrder = await sut.execute(newOrderMock)
        expect(orderItemRepository.create).toBeCalledTimes(
            newOrderMock.orderItems.length
        )
        expect(orderItemRepository.create).toBeCalledWith(
            newOrderMock.orderItems[0]
        )
        expect(createdOrder).toEqual(createdOrderMock)
    })

    test('Deve criar um pedido com mais de um item', async () => {
        const newOrderItemMock = makeNewOrderItemMock({ quantity: 1 })
        const createdOrderItemMock = makeCreatedOrderItemMock(newOrderItemMock)
        const newOrderMock = makeNewOrderMock({
            number: 1,
            price: 1,
            userId: 'any_user_id',
            orderItems: [newOrderItemMock, newOrderItemMock, newOrderItemMock],
        })
        const createdOrderMock = makeCreatedOrderMock({
            ...newOrderMock,
            orderItems: [
                createdOrderItemMock,
                createdOrderItemMock,
                createdOrderItemMock,
            ],
        })

        const { sut, orderItemRepository } = makeSut()
        const createdOrder = await sut.execute(newOrderMock)

        expect(orderItemRepository.create).toBeCalledTimes(3)
        expect(createdOrder).toEqual(createdOrderMock)
    })
})
