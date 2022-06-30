import { InvalidFieldError } from '../errors/InvalidFieldError'
import { ICpfValidation } from '../protocols/ICPfValidation'
import { IValidation } from '../protocols/IValidation'

export class CpfValidation implements ICpfValidation {
    private readonly cpfLength = 11
    private readonly numberOfDigits = 2
    public cpf: string = ''

    constructor(public validators: IValidation[]) {}

    static build(validators: IValidation[]) {
        return new CpfValidation(validators)
    }

    execute(cpf: string): Error {
        this.cpf = this.sanitizeCpf(cpf)
        this.validators.forEach((validator) => validator.execute(this.cpf))
        const { firstSegment, digitsToValidate } = this.segragateCpf()
        const { validDigits } = this.calculatesValidDigits(firstSegment)
        if (validDigits !== digitsToValidate) throw new InvalidFieldError()
        return null
    }

    private sanitizeCpf(value) {
        return value
            .replace('.', '')
            .replace('.', '')
            .replace('-', '')
            .replace(' ', '')
    }

    private segragateCpf(): {
        firstSegment: string[]
        digitsToValidate: string
    } {
        const firstIndex = 0
        const digitsIndex = this.cpfLength - this.numberOfDigits
        const firstSegment = this.cpf
            .substring(firstIndex, digitsIndex)
            .split('')
        const digitsToValidate = this.cpf.substring(digitsIndex, this.cpfLength)
        return { firstSegment, digitsToValidate }
    }

    private calculatesValidDigits(firstSegment: string[]) {
        const { firstTotal, secondTotal } = firstSegment.reduce(
            (acc, digit, index) => {
                const firstMultiplier = this.cpfLength - 1 - index
                const secondMultiplier = this.cpfLength - index
                acc.firstTotal = acc.firstTotal +=
                    firstMultiplier * parseInt(digit, 10)
                acc.secondTotal = acc.secondTotal +=
                    secondMultiplier * parseInt(digit, 10)
                return acc
            },
            { firstTotal: 0, secondTotal: 0 }
        )
        const firstDigit = this.calculatesFirsDigit(firstTotal)
        const secondDigit = this.calculatesSecondDigit(firstDigit, secondTotal)
        return { validDigits: `${firstDigit}${secondDigit}` }
    }

    private calculatesFirsDigit(firstTotal: number): number {
        const remainder = firstTotal % this.cpfLength
        return this.getValidDigit(remainder)
    }

    private calculatesSecondDigit(
        firstDigit: number,
        secondTotal: number
    ): number {
        const remainder = (secondTotal + firstDigit * 2) % this.cpfLength
        return this.getValidDigit(remainder)
    }

    private getValidDigit(remainder: number) {
        return remainder < 2 ? 0 : this.cpfLength - remainder
    }
}
