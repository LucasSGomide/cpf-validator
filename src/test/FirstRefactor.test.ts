import { cpfValidation } from '../FirstRefactor'

describe('CPF', () => {
    test('Deve retornar true para um cpf válido', () => {
        const cpf = '061.813.806-47'

        const result = cpfValidation(cpf)

        expect(result).toBeTruthy()
    })

    test('Deve retornar true para um cpf válido que não tem caracteres especiais', () => {
        const cpf = '06181380647'

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

    test('Deve retornar false se o cpf tiver mais de 11 dígitos', () => {
        const cpf = '011.111.100-488'

        const result = cpfValidation(cpf)

        expect(result).toBeFalsy()
    })

    test('Deve retornar false se o cpf tiver menos de 11 dígitos', () => {
        const cpf = '011.111.10'

        const result = cpfValidation(cpf)

        expect(result).toBeFalsy()
    })

    test('Deve retornar false se todos os characteres forem iguais', () => {
        const cpf = '11111111111'

        const result = cpfValidation(cpf)

        expect(result).toBeFalsy()
    })

    test('Deve retornar false se o parâmetro passado para validação não for uma string', () => {
        const cpf = {}

        const result = cpfValidation(cpf)

        expect(result).toBeFalsy()
    })
})
