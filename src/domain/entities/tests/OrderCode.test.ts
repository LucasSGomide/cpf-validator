import { OrderCode } from '../OrderCode'

describe('OrderCode', () => {
    it('Deve retornar o código do pedido com o ano correto', () => {
        const sut = new OrderCode(1, new Date('2020-05-10T00:00:00'))
        const expectedCode = '202000000001'
        expect(sut.value).toBe(expectedCode)
    })

    it('Deve retornar o código do pedido com o ano corrente', () => {
        const sut = new OrderCode(2, new Date('2022-01-01T00:00:00'))
        const expectedCode = '202200000002'
        expect(sut.value).toBe(expectedCode)
    })
})
