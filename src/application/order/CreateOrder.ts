import { IUseCase } from '@application/protocols/IUseCase'
import { Order, OrderItem } from '@domain/entities'
import {
    IOrderItemRepository,
    IOrderRepository,
    IUserRepository,
} from '@domain/repository'

export class CreateOrder implements IUseCase {
    constructor(
        private orderRepository: IOrderRepository,
        private orderItemRepository: IOrderItemRepository,
        private userRepository: IUserRepository
    ) {}

    async execute(order: Order): Promise<Order> {
        const user = await this.userRepository.findById({ id: order.userId })
        if (!user) throw new Error('Usuário não encontrado.')
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
