import { OrderItem, OrderItemTypes } from '@domain/entities/OrderItem'
import { Product } from '@domain/entities/Product'
import { IOrderItemRepository } from '@domain/repository'

export const makeNewOrderItemMock = ({ quantity }: Partial<OrderItemTypes>) => {
    const newOrderItem = new OrderItem({
        quantity,
        product: new Product({
            name: 'any_product_name',
            price: 1,
            description: 'any_description',
        }),
    })

    return newOrderItem
}

export const makeCreatedOrderItemMock = (orderItem: OrderItem) => {
    const createdOrderItemMock = new OrderItem({
        ...orderItem,
        id: 'any_order_item_id',
        createdAt: new Date('2022-07-01'),
        updatedAt: new Date('2022-07-01'),
        deletedAt: null,
    })

    return createdOrderItemMock
}

export const makeOrderItemRepositoryMock = (): IOrderItemRepository => {
    const createMock = jest.fn((orderItem: OrderItem) =>
        Promise.resolve({
            ...orderItem,
            id: 'any_order_item_id',
            createdAt: new Date('2022-07-01'),
            updatedAt: new Date('2022-07-01'),
            deletedAt: null,
        })
    )

    return {
        create: createMock,
    }
}
