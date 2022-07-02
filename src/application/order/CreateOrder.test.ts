import { IOrderRepository } from '@domain/repository/IOrderRepository'
import { CreateOrder } from './CreateOrder'
import {
    createdOrderMock,
    makeOrderRepositoryMock,
    orderToCreate,
} from './mocks'

type SutTypes = {
    orderRepository: IOrderRepository
    sut: CreateOrder
}

const makeSut = (): SutTypes => {
    const orderRepository = makeOrderRepositoryMock()

    return {
        orderRepository,
        sut: new CreateOrder(orderRepository),
    }
}

describe('CreateOrder', () => {
    test('Deve criar um novo pedido', async () => {
        const { sut, orderRepository } = makeSut()
        jest.spyOn(orderRepository, 'create')

        const createdOrder = await sut.execute(orderToCreate)

        expect(orderRepository.create).toBeCalledTimes(1)
        expect(orderRepository.create).toBeCalledWith(orderToCreate)
        expect(createdOrder).toEqual(createdOrderMock)
    })
})
