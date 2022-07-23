import { InvalidCpfError } from '@domain/errors/InvalidCpfError'

export class Cpf {
    private readonly firstFactor = 10
    private readonly secondFactor = 11

    constructor(private readonly value: string) {
        if (!this.validate(value)) throw new InvalidCpfError()
        this.value = value
    }

    getValue() {
        return this.value
    }

    private validate(cpf: string): boolean {
        const value = this.sanitizeCpf(cpf)
        if (this.isInvalidLength(value)) return false
        if (this.isAllEqualCharacters(value)) return false
        const digitsToValidate = this.getDigitsToValidate(value)
        const firstDigit = this.calculatesValidDigit(value, this.firstFactor)
        const secondDigit = this.calculatesValidDigit(value, this.secondFactor)
        const validDigits = `${firstDigit}${secondDigit}`
        return validDigits === digitsToValidate
    }

    private sanitizeCpf(value: string): string {
        return value.replace(/\D+/g, '')
    }

    private getDigitsToValidate(cpf: string): string {
        const lastTwoCharacters = -2
        return cpf.slice(lastTwoCharacters)
    }

    private isAllEqualCharacters(cpf: string) {
        const firstCharacter = cpf[0]
        return [...cpf].every((character) => character === firstCharacter)
    }

    private isInvalidLength(cpf: string) {
        const cpfLength = 11
        return cpf.length !== cpfLength
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
