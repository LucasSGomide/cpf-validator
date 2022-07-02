import { Order } from '@domain/entities/Order'
import { IBaseRepository } from './IBaseRepository'

export interface IOrderRepository extends IBaseRepository<Order> {}
