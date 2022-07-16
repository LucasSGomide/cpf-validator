import { Product } from './Product'

export class FreightCalculator {
    static minPrice: number = 10

    static calculate(product: Product) {
        const freight =
            product.getVolume() * 1000 * (product.getDensity() / 100)
        if (!freight) return 0
        return Math.max(freight, this.minPrice)
    }
}
