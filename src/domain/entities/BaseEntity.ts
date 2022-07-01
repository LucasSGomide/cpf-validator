export abstract class BaseEntity {
    id?: string
    createdAt?: Date
    deletedAt?: Date
    updatedAt?: Date

    constructor({ id, createdAt, deletedAt, updatedAt }: BaseEntity) {
        this.id = id
        this.createdAt = createdAt
        this.deletedAt = deletedAt
        this.updatedAt = updatedAt
    }
}
