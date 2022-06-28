import { validate } from '../cpf'

describe('CPF', () => {
    test('Deve retornar true para um cpf válido', () => {
        const cpf = '061.813.806-47'

        const result = validate(cpf)

        expect(result).toBeTruthy()
    })
})
