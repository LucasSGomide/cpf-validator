import { InvalidFieldError } from '../errors/InvalidFieldError'
import { IValidation } from '../protocols/IValidation'

export class StringValidation implements IValidation {
    execute(value: any): Error {
        if (typeof value !== 'string') {
            throw new InvalidFieldError()
        }

        return null
    }
}
