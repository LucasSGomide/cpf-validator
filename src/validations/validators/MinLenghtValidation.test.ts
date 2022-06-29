import { InvalidFieldError } from '../errors/InvalidFieldError'
import { MinLengthValidation } from './MinLengthValidation'

const makeSut = (field: string = 'ANY_FIELD') =>
    new MinLengthValidation(field, 3)

describe('MinLengthValidation', () => {
    test('Deve lançar InvalidFieldError se não possuir a length mínima', () => {
        const field = 'ANY_FIELD'
        const sut = makeSut(field)
        try {
            sut.execute('')
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidFieldError)
            expect(error.message).toBe(`Invalid ${field} field.`)
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
