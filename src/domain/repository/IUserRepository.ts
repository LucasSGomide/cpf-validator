import { User } from '@domain/entities'
import { IBaseRepository } from './IBaseRepository'

export interface IUserRepository extends IBaseRepository<User> {}
