export class User {
    name: string
    lastName: string
    cpf: string

    constructor({ name, lastName, cpf }: UserTypes) {
        this.name = name
        this.lastName = lastName
        this.cpf = cpf
    }
}

type UserTypes = {
    name: string
    lastName: string
    cpf: string
}
