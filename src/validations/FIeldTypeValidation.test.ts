import { FieldTypeValidation } from './FieldTypeValidation'

describe('FieldTypeValidation', () => {
    test('Deve retornar null se o campo for válido', () => {
        const sut = new FieldTypeValidation('ANY_FIELD', 'STRING')

        const result = sut.execute('STRING')

        expect(result).toBeFalsy()
    })
})
