import { Dimension } from '@domain/entities/Dimension'
import { InvalidAttributeError } from '@domain/errors/InvalidAttributeError'

describe('Dimension', () => {
    it('Deve retornar o volume correto de um produto', () => {
        const dimension = new Dimension(20, 15, 10, 2)
        const volume = dimension.getVolume()
        expect(volume).toBe(0.003)
    })

    it('Deve retornar a densidade correta de um produto', () => {
        const dimension = new Dimension(100, 30, 10, 3)
        const density = dimension.getDensity()
        expect(density).toBe(100)
    })

    const dimensions = [
        { length: -100, height: 30, width: 10, weight: 5 },
        { length: 100, height: -30, width: 10, weight: 5 },
        { length: 100, height: 30, width: -10, weight: 5 },
        { length: 100, height: 30, width: 10, weight: -5 },
    ]

    it.each(dimensions)(
        'Deve lançar erro se existirem dimensões negativas',
        ({ length, height, width, weight }) => {
            expect(() => new Dimension(length, height, width, weight)).toThrow(
                new InvalidAttributeError('dimension')
            )
        }
    )
})
