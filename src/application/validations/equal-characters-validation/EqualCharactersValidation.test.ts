import { InvalidFieldError } from '@domain/errors/InvalidFieldError'
import { EqualCharactersValidation } from './EqualCharactersValidation'

const makeSut = () => new EqualCharactersValidation()

describe('EqualCharactersValidation', () => {
    test('Deve lançar erro todos os caracteres forem iguais', () => {
        const sut = makeSut()

        try {
            sut.execute('aaa')
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidFieldError)
            expect(error.message).toBe('Invalid field.')
        }
    })
    test('Deve retornar null se existirem caracteres diferentes', () => {
        const sut = makeSut()

        const result = sut.execute('ab')

        expect(result).toBeNull()
    })
})
