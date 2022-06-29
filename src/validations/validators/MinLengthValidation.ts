import { InvalidFieldError } from '../errors/InvalidFieldError'
import { IValidation } from '../protocols/IValidation'

export class MinLengthValidation implements IValidation {
    constructor(readonly field: string, private minLength: number) {}

    execute(value: any): Error {
        if (value.length < this.minLength) {
            throw new InvalidFieldError(this.field)
        }
        return null
    }
}
