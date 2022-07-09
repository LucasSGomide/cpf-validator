import { InvalidFieldError } from '@domain/errors/InvalidFieldError'
import { ICpfValidation } from '@domain/validations/ICPfValidation'
import { makeCpfValidation } from './config'

const makeSut = () => makeCpfValidation()

const testInvalidCpf = (sut: ICpfValidation, cpf: string) => {
    try {
        sut.execute(cpf)
        throw new Error('Teste Inválido')
    } catch (err) {
        expect(err).toBeInstanceOf(InvalidFieldError)
        expect(err.message).toBe('Invalid field.')
    }
}

describe('CpfValidation', () => {
    test('Deve retornar null se o cpf for válido', () => {
        const sut = makeSut()
        const cpf = '473.491.640-33'
        const result = sut.execute(cpf)
        expect(result).toBeFalsy()
    })

    test('Deve ser possível obter o CPF tratado se o CPF for válido', () => {
        const sut = makeSut()
        sut.execute('473.491.640-33')
        const cpf = sut.getValue()
        expect(cpf).toEqual('47349164033')
    })

    test('Não deve ser possível obter o CPF tratado se o CPF for inválido', () => {
        const sut = makeSut()
        let cpf: string
        try {
            sut.execute('061.813.806-45')
            cpf = sut.getValue()
            throw new Error('Teste Inválido')
        } catch (err) {
            expect(err).not.toEqual(new Error('Teste Inválido'))
            expect(cpf).toEqual(undefined)
        }
    })

    test('Deve retornar InvalidFieldError se o cpf for inválido', () => {
        const sut = makeSut()
        const cpf = '127.937.070-06'
        testInvalidCpf(sut, cpf)
    })

    test('Deve retornar false para um cpf inválido em que o primeiro digito deveria ser 0', () => {
        const sut = makeSut()
        const cpf = '473.491.640-31'
        testInvalidCpf(sut, cpf)
    })

    test('Deve retornar false para um cpf inválido em que o segundo digito deveria ser 0', () => {
        const sut = makeSut()
        const cpf = '011.111.100-48'
        testInvalidCpf(sut, cpf)
    })

    test('Deve lançar InvalidFieldError se o cpf não tiver ao menos 11 caracteres', () => {
        const sut = makeSut()
        const cpf = '1234567891'
        testInvalidCpf(sut, cpf)
    })

    test('Deve lançar InvalidFieldError se o cpf tiver somente caracteres repetidos com caracteres especiais', () => {
        const sut = makeSut()
        const cpf = '111.111.111-11'
        testInvalidCpf(sut, cpf)
    })
})
