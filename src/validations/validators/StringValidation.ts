import { InvalidFieldError } from '../errors/InvalidFieldError'
import { IValidation } from '../protocols/IValidation'

export class StringValidation implements IValidation {
    constructor(readonly field: string) {}

    execute(value: any): Error {
        if (typeof value !== 'string') {
            throw new InvalidFieldError(this.field)
        }

        return null
    }
}
