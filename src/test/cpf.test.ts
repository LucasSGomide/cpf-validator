import { cpfValidation } from '../cpf'

describe('CPF', () => {
    test('Deve retornar true para um cpf válido', () => {
        const cpf = '061.813.806-47'

        const result = cpfValidation(cpf)

        expect(result).toBeTruthy()
    })

    test('Deve retornar false para um cpf inválido em que o penúltimo digito deveria ser 0', () => {
        const cpf = '061.813.100-48'

        const result = cpfValidation(cpf)

        expect(result).toBeFalsy()
    })

    test('Deve retornar false para um cpf inválido em que o último digito deveria ser 0', () => {
        const cpf = '011.111.100-48'

        const result = cpfValidation(cpf)

        expect(result).toBeFalsy()
    })

    test('Deve retornar false se o cpf for null', () => {
        const cpf = null

        const result = cpfValidation(cpf)

        expect(result).toBeFalsy()
    })

    test('Deve retornar false se o cpf possuir caracteres inválidos', () => {
        const cpf = '&&&&&&&&&&&&&&'

        const result = cpfValidation(cpf)

        expect(result).toBeFalsy()
    })

    test('Deve retornar false se o cpf for um objeto', () => {
        const cpf = {}

        const result = cpfValidation(cpf)

        expect(result).toBeFalsy()
    })
})
