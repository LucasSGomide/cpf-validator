import { IUseCase } from '@application/protocols/IUseCase'
import { Order } from '@domain/entities/Order'
import { OrderItem } from '@domain/entities/OrderItem'
import { IOrderItemRepository, IOrderRepository } from '@domain/repository'

export class CreateOrder implements IUseCase {
    constructor(
        private orderRepository: IOrderRepository,
        private orderItemRepository: IOrderItemRepository
    ) {}

    async execute(order: Order): Promise<Order> {
        const createdOrder = await this.orderRepository.create(order)
        const createdOrderItems = await Promise.all(
            order.orderItems.map(async (orderItem) => {
                const createdItem = await this.orderItemRepository.create(
                    new OrderItem(orderItem)
                )
                return createdItem
            })
        )

        return Promise.resolve(
            new Order({ ...createdOrder, orderItems: createdOrderItems })
        )
    }
}
