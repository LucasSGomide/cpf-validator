import { Product } from './Product'

export class FreightCalculator {
    static calculate(product: Product) {
        const volume = product.getVolume()
        if (volume === 0) return 0
        const density = product.getDensity()
        return 1000 * volume * (density / 100)
    }
}
