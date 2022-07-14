import { Dimension } from '@domain/entities/Dimension'

describe('Dimension', () => {
    it('Deve retornar o volume correto de um produto', () => {
        const dimension = new Dimension({ length: 20, height: 15, width: 10 })
        const volume = dimension.getVolume()
        expect(volume).toBe(0.003)
    })

    it('Deve retornar a densidade correta de um produto', () => {
        const weight = 3
        const dimension = new Dimension({ length: 100, height: 30, width: 10 })
        const density = dimension.getDensity(weight)
        expect(density).toBe(100)
    })
})
