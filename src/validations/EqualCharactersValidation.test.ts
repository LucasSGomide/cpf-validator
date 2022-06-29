import { EqualCharactersValidation } from './EqualCharactersValidation'

describe('EqualCharactersValidation', () => {
    test('Deve lançar erro todos os caracteres forem iguais', () => {
        const sut = new EqualCharactersValidation('ANY_FIELD')

        expect(() => sut.execute('aaa')).toThrow()
    })
    test('Deve retornar null se existirem caracteres diferentes', () => {
        const sut = new EqualCharactersValidation('ANY_FIELD')

        const result = sut.execute('ab')

        expect(result).toBeNull()
    })
})
