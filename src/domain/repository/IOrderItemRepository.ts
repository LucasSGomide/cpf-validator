import { OrderItem } from '@domain/entities'
import { IBaseRepository } from './IBaseRepository'

export interface IOrderItemRepository extends IBaseRepository<OrderItem> {}
