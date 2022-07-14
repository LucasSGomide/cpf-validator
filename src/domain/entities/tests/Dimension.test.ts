import { Dimension } from '@domain/entities/Dimension'

describe('Dimension', () => {
    it('Deve retornar o volume correto de um produto', () => {
        const dimension = new Dimension({ length: 20, height: 15, width: 10 })
        const volume = dimension.getVolume()
        expect(volume).toBe(0.003)
    })
})
