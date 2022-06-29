import { IValidation } from './protocols/IValidation'

export class FieldTypeValidation implements IValidation {
    constructor(readonly field: string, private readonly type: string) {}

    execute(_value: any): Error {
        return null
    }
}
