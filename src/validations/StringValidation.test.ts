import { InvalidFieldError } from './errors/InvalidFieldError'
import { StringValidation } from './StringValidation'

const makeSut = (field: string = 'ANY_FIELD') => new StringValidation(field)

describe('FieldTypeValidation', () => {
    test('Deve retornar null se o campo for válido', () => {
        const sut = makeSut()

        const result = sut.execute('STRING')

        expect(result).toBeFalsy()
    })

    test('Deve lançar InvalidFieldError se o campo for inválido', () => {
        const field = 'ANY_FIELD'
        const sut = makeSut(field)

        try {
            sut.execute(10)
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidFieldError)
            expect(error.message).toBe(`Invalid ${field} field.`)
        }
    })
})
