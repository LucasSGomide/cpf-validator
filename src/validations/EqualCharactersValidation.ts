import { IValidation } from './protocols/IValidation'

export class EqualCharactersValidation implements IValidation {
    private valueArray: string[] = []

    constructor(readonly field: string) {}

    execute(value: string): Error {
        this.valueArray = value.split('')
        const firstCharacter = this.valueArray[0]

        const isEqualCharacters = this.valueArray.every(
            (character) => character === firstCharacter
        )

        if (isEqualCharacters) throw new Error(`Invalid ${this.field} field.`)
        return null
    }
}
