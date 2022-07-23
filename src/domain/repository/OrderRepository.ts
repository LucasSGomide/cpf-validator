import { Order } from '@domain/entities'

export interface OrderRepository {
    create(entity: Order): Promise<void>
    count(): Promise<number>
}
