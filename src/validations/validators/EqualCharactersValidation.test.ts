import { EqualCharactersValidation } from './EqualCharactersValidation'
import { InvalidFieldError } from '../errors/InvalidFieldError'

const makeSut = (field: string = 'ANY_FIELD') =>
    new EqualCharactersValidation(field)

describe('EqualCharactersValidation', () => {
    test('Deve lançar erro todos os caracteres forem iguais', () => {
        const field = 'ANY_FIELD'
        const sut = makeSut(field)

        try {
            sut.execute('aaa')
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidFieldError)
            expect(error.message).toBe(`Invalid ${field} field.`)
        }
    })
    test('Deve retornar null se existirem caracteres diferentes', () => {
        const sut = makeSut()

        const result = sut.execute('ab')

        expect(result).toBeNull()
    })
})
