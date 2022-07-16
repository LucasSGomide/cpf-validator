export class InvalidCpfError extends Error {
    constructor() {
        super('Invalid cpf.')

        this.name = 'InvalidCpfError'
    }
}
