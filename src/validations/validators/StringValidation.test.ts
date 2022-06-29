import { InvalidFieldError } from '../errors/InvalidFieldError'
import { StringValidation } from './StringValidation'

const makeSut = () => new StringValidation()

describe('FieldTypeValidation', () => {
    test('Deve retornar null se o campo for válido', () => {
        const sut = makeSut()

        const result = sut.execute('STRING')

        expect(result).toBeFalsy()
    })

    test('Deve lançar InvalidFieldError se o campo for inválido', () => {
        const sut = makeSut()

        try {
            sut.execute(10)
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidFieldError)
            expect(error.message).toBe('Invalid field.')
        }
    })
})
