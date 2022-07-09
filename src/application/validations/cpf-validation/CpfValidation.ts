import { InvalidFieldError } from '@domain/errors/InvalidFieldError'
import { ICpfValidation } from '@domain/validations/ICPfValidation'
import { IValidation } from '@domain/validations/IValidation'

export class CpfValidation implements ICpfValidation {
    readonly firstFactor = 10
    readonly secondFactor = 11
    private value: string

    constructor(private validators: IValidation[]) {}

    static build(validators: IValidation[]) {
        return new CpfValidation(validators)
    }

    getValue() {
        return this.value
    }

    execute(cpf: string): Error {
        const value = this.sanitizeCpf(cpf)
        this.value = value
        this.validators.forEach((validator) => validator.execute(value))
        const digitsToValidate = this.getDigitsToValidate(value)
        const firstDigit = this.calculatesValidDigit(value, this.firstFactor)
        const secondDigit = this.calculatesValidDigit(value, this.secondFactor)
        const validDigits = `${firstDigit}${secondDigit}`
        if (validDigits !== digitsToValidate) throw new InvalidFieldError()
        return null
    }

    private sanitizeCpf(value: string): string {
        return value.replace(/\D+/g, '')
    }

    private getDigitsToValidate(cpf: string): string {
        const lastTwoCharacters = -2
        return cpf.slice(lastTwoCharacters)
    }

    private calculatesValidDigit(cpf: string, factor: number): number {
        let total = 0
        let multiplier = factor
        const characters = Array.from(cpf)
        characters.forEach((character) => {
            if (multiplier > 1) {
                total += parseInt(character, 10) * multiplier
                multiplier -= 1
            }
        })

        const rest = total % 11
        return rest < 2 ? 0 : 11 - rest
    }
}
