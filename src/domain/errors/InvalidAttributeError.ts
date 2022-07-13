type InvalidAttributeErrorTypes = {
    quantity: string
}

export class InvalidAttributeError extends Error {
    constructor(attribute: keyof InvalidAttributeErrorTypes) {
        super(`Invalid ${attribute}.`)

        this.name = 'InvalidAttributeError'
    }
}
