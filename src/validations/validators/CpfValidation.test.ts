import { IValidation } from '../protocols/IValidation'

class CpfValidation implements IValidation {
    constructor(readonly field: string) {}

    execute(value: string): Error {
        return null
    }
}

describe('CpfValidation', () => {
    test('Deve retornar null se o cpf for válido', () => {
        const sut = new CpfValidation('ANY_FIELD')

        const result = sut.execute('')

        expect(result).toBeFalsy()
    })
})
