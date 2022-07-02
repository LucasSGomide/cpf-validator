import { Order } from '@domain/entities/Order'
import { Product } from '@domain/entities/Product'
import { OrderItem } from '@domain/entities/OrderItem'
import { IBaseRepository } from '@domain/repository/IBaseRepository'

export const orderToCreate = new Order({
    number: 1,
    price: 100,
    userId: 'any_user_id',
    orderItems: [
        new OrderItem({
            quantity: 5,
            product: new Product({
                name: 'any_product_name',
                price: 10,
                description: 'any_description',
            }),
        }),
    ],
})

export const createdOrderMock = new Order({
    ...orderToCreate,
    id: 'any_order_id',
    createdAt: new Date('2022-07-01'),
    updatedAt: new Date('2022-07-01'),
    deletedAt: null,
    orderItems: [
        ...orderToCreate.orderItems,
        {
            ...orderToCreate.orderItems[0],
            id: 'any_order_item_id',
            createdAt: new Date('2022-07-01'),
            updatedAt: new Date('2022-07-01'),
            deletedAt: null,
        },
    ],
})

class OrderRepositoryMock implements IBaseRepository<Order> {
    async create(order: Order): Promise<Order> {
        return Promise.resolve(createdOrderMock)
    }
}

export const makeOrderRepositoryMock = () => new OrderRepositoryMock()
