// @ts-nocheck
export function cpfValidation(cpfValidation) {
    if (cpfValidation !== null) {
        if (cpfValidation !== undefined) {
            if (cpfValidation.length >= 11 || cpfValidation.length <= 14) {
                cpfValidation = cpfValidation
                    .replace('.', '')
                    .replace('.', '')
                    .replace('-', '')
                    .replace(' ', '')

                if (
                    !cpfValidation
                        .split('')
                        .every((c) => c === cpfValidation[0])
                ) {
                    try {
                        let d1
                        let d2
                        let dg1
                        let dg2
                        let rest
                        let digito
                        let nDigResult
                        d1 = d2 = 0
                        dg1 = dg2 = rest = 0

                        for (
                            let nCount = 1;
                            nCount < cpfValidation.length - 1;
                            nCount++
                        ) {
                            // if (isNaN(parseInt(str.substring(nCount -1, nCount)))) {
                            // 	return false;
                            // } else {

                            digito = parseInt(
                                cpfValidation.substring(nCount - 1, nCount)
                            )
                            d1 += (11 - nCount) * digito

                            d2 += (12 - nCount) * digito
                            // }
                        }

                        rest = d1 % 11
                        dg1 = rest < 2 ? (dg1 = 0) : 11 - rest
                        d2 += 2 * dg1
                        rest = d2 % 11
                        if (rest < 2) dg2 = 0
                        else dg2 = 11 - rest

                        const nDigVerific = cpfValidation.substring(
                            cpfValidation.length - 2,
                            cpfValidation.length
                        )
                        nDigResult = `${dg1}${dg2}`
                        return nDigVerific == nDigResult
                    } catch (e) {
                        console.error(`Erro !${e}`)

                        return false
                    }
                } else return false
            } else return false
        }
    } else return false
}
