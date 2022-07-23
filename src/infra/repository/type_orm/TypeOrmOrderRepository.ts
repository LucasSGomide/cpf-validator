import { Order } from '@domain/entities'
import { OrderRepository } from '@domain/repository/OrderRepository'
import { OrderEntity } from '@infra/database/entities/OrderEntity'
import { DataSource, Repository } from 'typeorm'

export class TypeOrmOrderRepository implements OrderRepository {
    repository: Repository<OrderEntity>

    constructor(connection: DataSource) {
        this.repository = connection.getRepository(OrderEntity)
    }

    async create(order: Order): Promise<void> {
        await this.repository.save({
            request_date: order.requestDate,
            cpf: order.cpf.getValue(),
            code: order.getCode(),
            price: order.getPrice(),
            freight_price: order.getFreightPrice(),
            coupon_code: order?.discountCoupon.code,
            coupon_percentage: order?.discountCoupon.percentage,
        })
    }

    async count(): Promise<number> {
        const orders = this.repository.count()
        return orders
    }
}
