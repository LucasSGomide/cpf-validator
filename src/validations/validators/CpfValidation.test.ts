import { InvalidFieldError } from '../errors/InvalidFieldError'
import { CpfValidation } from './CpfValidation'
import { EqualCharactersValidation } from './EqualCharactersValidation'
import { MinLengthValidation } from './MinLengthValidation'

const makeSut = () =>
    CpfValidation.build([
        new MinLengthValidation(11),
        new EqualCharactersValidation(),
    ])

const testInvalidCpf = (sut: CpfValidation, cpf: string) => {
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

        const result = sut.execute('061.813.806-47')

        expect(result).toBeFalsy()
    })

    test('Deve retornar InvalidFieldError se o cpf for inválido', () => {
        const sut = makeSut()
        const cpf = '061.813.806-45'

        testInvalidCpf(sut, cpf)
    })

    test('Deve retornar false para um cpf inválido em que o primeiro digito deveria ser 0', () => {
        const sut = makeSut()
        const cpf = '061.813.100-48'

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
