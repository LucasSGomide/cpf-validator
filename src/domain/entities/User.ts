import { BaseEntity } from './BaseEntity'

export class User extends BaseEntity {
    name: string
    lastName: string
    cpf: string

    constructor({
        id,
        createdAt,
        deletedAt,
        updatedAt,
        name,
        lastName,
        cpf,
    }: User) {
        super({ id, createdAt, deletedAt, updatedAt })
        this.name = name
        this.lastName = lastName
        this.cpf = cpf
    }
}
