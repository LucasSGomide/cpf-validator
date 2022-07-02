import { IBaseRepository } from '@domain/repository/IBaseRepository'
import { IUseCase } from '@application/protocols/IUseCase'
import { Order } from '@domain/entities/Order'

export class CreateOrder implements IUseCase {
    constructor(private orderRepository: IBaseRepository<Order>) {}

    async execute(order: Order): Promise<Order> {
        const createdOrder = this.orderRepository.create(order)

        return Promise.resolve(createdOrder)
    }
}
