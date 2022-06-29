import { EqualCharactersValidation } from './EqualCharactersValidation'

const makeSut = () => new EqualCharactersValidation('ANY_FIELD')

describe('EqualCharactersValidation', () => {
    test('Deve lançar erro todos os caracteres forem iguais', () => {
        const sut = makeSut()

        expect(() => sut.execute('aaa')).toThrow()
    })
    test('Deve retornar null se existirem caracteres diferentes', () => {
        const sut = makeSut()

        const result = sut.execute('ab')

        expect(result).toBeNull()
    })
})
