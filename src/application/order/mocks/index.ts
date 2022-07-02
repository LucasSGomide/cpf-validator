import { Order, OrderTypes } from '@domain/entities/Order'
import { IOrderRepository } from '@domain/repository'

export const makeNewOrderMock = ({
    number,
    price,
    userId,
    orderItems,
}: OrderTypes) =>
    new Order({
        number,
        price,
        userId,
        orderItems,
    })

export const makeCreatedOrderMock = (order: Order) =>
    new Order({
        ...order,
        id: 'any_order_id',
        createdAt: new Date('2022-07-01'),
        updatedAt: new Date('2022-07-01'),
        deletedAt: null,
    })

export const makeOrderRepositoryMock = (): IOrderRepository => {
    const createMock = jest.fn((order: Order) =>
        Promise.resolve({
            ...order,
            id: 'any_order_id',
            createdAt: new Date('2022-07-01'),
            updatedAt: new Date('2022-07-01'),
            deletedAt: null,
        })
    )

    return {
        create: createMock,
    }
}
