import {
    makeCreatedOrderItemMock,
    makeNewOrderItemMock,
} from '@application/order-item/mocks'
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

type MakeOrderMocksTypes = {
    newOrderMock: Order
    createdOrderMock: Order
}

export const makeOrderMocks = (numberOfItems = 1): MakeOrderMocksTypes => {
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
        findById: jest.fn(),
    }
}
