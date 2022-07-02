import { BaseEntity } from '@domain/entities/BaseEntity'

export interface IBaseRepository<Entity extends BaseEntity> {
    create(param: Entity): Promise<Entity>
    findById(param: { id: string }): Promise<Entity>
}
