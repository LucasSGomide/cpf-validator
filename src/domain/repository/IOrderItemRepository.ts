import { OrderItem } from '@domain/entities/OrderItem'
import { IBaseRepository } from './IBaseRepository'

export interface IOrderItemRepository extends IBaseRepository<OrderItem> {}
