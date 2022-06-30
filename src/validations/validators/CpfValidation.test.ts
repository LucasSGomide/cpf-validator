import { InvalidFieldError } from '../errors/InvalidFieldError'
import { CpfValidation } from './CpfValidation'
import { EqualCharactersValidation } from './EqualCharactersValidation'
import { MinLengthValidation } from './MinLengthValidation'

const makeSut = () =>
    CpfValidation.build([
        new MinLengthValidation(11),
        new EqualCharactersValidation(),
    ])

describe('CpfValidation', () => {
    test('Deve retornar null se o cpf for válido', () => {
        const sut = makeSut()

        const result = sut.execute('061.813.806-47')

        expect(result).toBeFalsy()
    })

    test('Deve retornar InvalidFieldError se o cpf for inválido', () => {
        const sut = makeSut()

        try {
            sut.execute('1234567891')
            throw new Error('061.813.806-45')
        } catch (err) {
            expect(err).toBeInstanceOf(InvalidFieldError)
            expect(err.message).toBe('Invalid field.')
        }
    })

    test('Deve lançar InvalidFieldError se o cpf não tiver ao menos 11 caracteres', () => {
        const sut = makeSut()

        try {
            sut.execute('1234567891')
            throw new Error('Teste Inválido')
        } catch (err) {
            expect(err).toBeInstanceOf(InvalidFieldError)
            expect(err.message).toBe('Invalid field.')
        }
    })

    test('Deve lançar InvalidFieldError se o cpf tiver somente caracteres repetidos com caracteres especiais', () => {
        const sut = makeSut()

        try {
            sut.execute('111.111.111-11')
            throw new Error('Teste Inválido')
        } catch (err) {
            expect(err).toBeInstanceOf(InvalidFieldError)
            expect(err.message).toBe('Invalid field.')
        }
    })
})
