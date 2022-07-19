import { GenerateOrderCode } from '../GenerateOrderCode'

describe('GenerateOrderCode', () => {
    it('Deve retornar o código do pedido com o ano correto', () => {
        const sut = new GenerateOrderCode(1, new Date('2020-05-10'))
        const expectedCode = '202000000001'
        const code = sut.getCode()
        expect(code).toBe(expectedCode)
    })

    it('Deve retornar o código do pedido com o ano corrente', () => {
        const sut = new GenerateOrderCode(2)
        const expectedCode = '202200000002'
        const code = sut.getCode()
        expect(code).toBe(expectedCode)
    })
})
