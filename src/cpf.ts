// @ts-nocheck

function removesCpfSpecialCharacters(cpf) {
    const handledCpf = cpf
        .replace('.', '')
        .replace('.', '')
        .replace('-', '')
        .replace(' ', '')

    return handledCpf
}

function isEqualDigits(cpf) {
    const cpfCharacters = cpf.split('')
    const firstCharacter = cpfCharacters[0]

    return cpfCharacters.every((character) => character === firstCharacter)
}

function isString(cpf) {
    return typeof cpf === 'string'
}

function getArrayFromFirstNineDigits(cpf) {
    const firstIndex = 0
    const secondIndex = cpf.length - 2

    return cpf.substring(firstIndex, secondIndex).split('')
}

function getLastTwoDigits(cpf) {
    const firstIndex = cpf.length - 2
    const secondIndex = cpf.length

    return cpf.substring(firstIndex, secondIndex)
}

function calculatesValidDigits(digitsArr) {
    const cpfLength = 11

    const { firstTotal, secondTotal } = digitsArr.reduce(
        (acc, digit, index) => {
            const firstMultiplier = cpfLength - 1 - index
            const secondMultiplier = cpfLength - index

            acc.firstTotal = acc.firstTotal += firstMultiplier * digit
            acc.secondTotal = acc.secondTotal += secondMultiplier * digit

            return acc
        },

        { firstTotal: 0, secondTotal: 0 }
    )

    const firstRemainder = firstTotal % cpfLength
    const validatedFirstDigit =
        firstRemainder < 2 ? 0 : cpfLength - firstRemainder

    const secondRemainder = (secondTotal + validatedFirstDigit * 2) % cpfLength
    const validatedSecondDigit =
        secondRemainder < 2 ? 0 : cpfLength - secondRemainder

    return `${validatedFirstDigit}${validatedSecondDigit}`
}

export function cpfValidation(cpf) {
    if (!cpf || !isString(cpf)) return false
    const handledCpf = removesCpfSpecialCharacters(cpf)
    if (isEqualDigits(handledCpf) || handledCpf.length !== 11) return false
    const fistNineDigitsArr = getArrayFromFirstNineDigits(handledCpf)
    const validDigits = calculatesValidDigits(fistNineDigitsArr)
    const digitsToCheck = getLastTwoDigits(handledCpf)
    return validDigits === digitsToCheck
}
