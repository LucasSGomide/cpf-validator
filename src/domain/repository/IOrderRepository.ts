import { Order } from '@domain/entities'
import { IBaseRepository } from './IBaseRepository'

export interface IOrderRepository extends IBaseRepository<Order> {}
