import { InvalidFieldError } from '@domain/errors/InvalidFieldError'
import { IValidation } from '@domain/validations/IValidation'

export class MinLengthValidation implements IValidation {
    constructor(private minLength: number) {}

    execute(value: any): Error {
        if (value.length < this.minLength) {
            throw new InvalidFieldError()
        }
        return null
    }
}
