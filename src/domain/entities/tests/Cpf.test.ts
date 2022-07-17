import { InvalidCpfError } from '@domain/errors/InvalidCpfError'
import { Cpf } from '../Cpf'

type SutParams = {
    value: string
}

const makeSut = ({ value }: SutParams) => new Cpf(value)
const testInvalidCpf = (cpf: string) =>
    expect(() => makeSut({ value: cpf })).toThrow(new InvalidCpfError())

describe('Cpf', () => {
    const validCpfs = ['473.491.640-33', '47349164033']
    test.each(validCpfs)(
        'Deve retornar validar um CPF valido',
        (cpf: string) => {
            const sut = makeSut({ value: cpf })
            expect(sut.getValue()).toBe(cpf)
        }
    )

    test('Deve lançar InvalidCpfError se o CPF for inválido', () => {
        const cpf = '127.937.070-06'
        testInvalidCpf(cpf)
    })

    test('Deve lançar InvalidCpfError para um CPF inválido em que o primeiro digito deveria ser 0', () => {
        const cpf = '473.491.640-31'
        testInvalidCpf(cpf)
    })

    test('Deve lançar InvalidCpfError para um CPF inválido em que o  segundo digito deveria ser 0', () => {
        const cpf = '011.111.100-48'
        testInvalidCpf(cpf)
    })

    test('Deve lançar InvalidCpfError se o CPF não tiver ao menos 11 caracteres', () => {
        const cpf = '1234567891'
        testInvalidCpf(cpf)
    })

    const allSameCharactersCpf = [
        '111.111.111-11',
        '222.222.222-22',
        '333.333.333-33',
    ]

    test.each(allSameCharactersCpf)(
        'Deve lançar InvalidCpfError se o cpf tiver somente caracteres repetidos',
        (cpf) => {
            testInvalidCpf(cpf)
        }
    )
})
