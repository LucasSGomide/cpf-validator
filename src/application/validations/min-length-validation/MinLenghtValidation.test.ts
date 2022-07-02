import { InvalidFieldError } from '@domain/errors/InvalidFieldError'
import { MinLengthValidation } from './MinLengthValidation'

const makeSut = () => new MinLengthValidation(3)

describe('MinLengthValidation', () => {
    test('Deve lançar InvalidFieldError se não possuir a length mínima', () => {
        const sut = makeSut()
        try {
            sut.execute('')
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidFieldError)
            expect(error.message).toBe('Invalid field.')
        }
    })

    test('Deve retornar null se possuir a length mínima', () => {
        const sut = makeSut()
        const result = sut.execute('123')
        expect(result).toBeNull()
    })

    test('Deve retornar null se possuir a length for acima da mínima', () => {
        const sut = makeSut()
        const result = sut.execute('1234')
        expect(result).toBeNull()
    })
})
