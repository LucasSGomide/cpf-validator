import { CreateOrder } from './CreateOrder'
import {
    createdOrderMock,
    makeOrderRepositoryMock,
    orderToCreate,
} from './mocks'

describe('CreateOrder', () => {
    test('Deve criar um novo pedido', async () => {
        const orderRepository = makeOrderRepositoryMock()
        jest.spyOn(orderRepository, 'create')

        const sut = new CreateOrder(orderRepository)
        const createdOrder = await sut.execute(orderToCreate)

        expect(orderRepository.create).toBeCalledTimes(1)
        expect(orderRepository.create).toBeCalledWith(orderToCreate)

        expect(createdOrder).toEqual(createdOrderMock)
    })
})
