type InvalidAttributeErrorTypes = {
    quantity: string
    orderItem: string
    dimension: string
    weight: string
}

export class InvalidAttributeError extends Error {
    constructor(attribute: keyof InvalidAttributeErrorTypes) {
        super(`Invalid ${attribute}.`)

        this.name = 'InvalidAttributeError'
    }
}
