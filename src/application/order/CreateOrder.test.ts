import {
    IOrderRepository,
    IOrderItemRepository,
    IUserRepository,
} from '@domain/repository'
import {
    makeOrderMocks,
    makeOrderRepositoryMock,
} from '@application/order/mocks'
import { makeOrderItemRepositoryMock } from '@application/order-item/mocks'
import { makeUserRepositoryMock } from '@application/user/mocks'
import { CreateOrder } from './CreateOrder'

type SutTypes = {
    orderRepository: IOrderRepository
    orderItemRepository: IOrderItemRepository
    userRepository: IUserRepository
    sut: CreateOrder
}

const makeSut = (): SutTypes => {
    const orderRepository = makeOrderRepositoryMock()
    const orderItemRepository = makeOrderItemRepositoryMock()
    const userRepository = makeUserRepositoryMock()
    const sut = new CreateOrder(
        orderRepository,
        orderItemRepository,
        userRepository
    )

    return {
        orderRepository,
        orderItemRepository,
        userRepository,
        sut,
    }
}

describe('CreateOrder', () => {
    test('Deve criar um novo pedido se o usuário for cadastrado', async () => {
        const { newOrderMock, createdOrderMock } = makeOrderMocks()
        const { sut, orderRepository, userRepository } = makeSut()
        const createdOrder = await sut.execute(newOrderMock)

        expect(userRepository.findById).toBeCalledTimes(1)
        expect(userRepository.findById).toBeCalledWith({
            id: newOrderMock.userId,
        })

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
