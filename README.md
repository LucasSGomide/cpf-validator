![JOB-STATUS](https://github.com/LucasSGomide/ecommerce-clean-arch/actions/workflows/github-action.yml/badge.svg)

## CPF Validation Refactor

-   Refactor challenge from [Branas.io](https://app.branas.io/public/products) **CleanCode and CleanArchitecture** course.
    -   [CPF Algorithm](https://www.macoratti.net/alg_cpf.htm)

### Function to Refactor:

-   Obs: The results are into the repository SRC folder
    -   "FirstRefactor.ts" is the first result using functions
    -   "CpfValidation.ts" is the last result using Typescript with Classes and Interfaces

```javascript
// @ts-nocheck
export function validate(str) {
    if (str !== null) {
        if (str !== undefined) {
            if (str.length >= 11 || str.length <= 14) {
                str = str
                    .replace('.', '')
                    .replace('.', '')
                    .replace('-', '')
                    .replace(' ', '')

                if (!str.split('').every((c) => c === str[0])) {
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
                            nCount < str.length - 1;
                            nCount++
                        ) {
                            // if (isNaN(parseInt(str.substring(nCount -1, nCount)))) {
                            // 	return false;
                            // } else {

                            digito = parseInt(str.substring(nCount - 1, nCount))
                            d1 += (11 - nCount) * digito

                            d2 += (12 - nCount) * digito
                            // }
                        }

                        rest = d1 % 11

                        dg1 = rest < 2 ? (dg1 = 0) : 11 - rest
                        d2 += 2 * dg1
                        rest = d2 % 11
                        if (rest < 2) {
                            dg2 = 0
                        } else {
                            dg2 = 11 - rest
                        }

                        const nDigVerific = str.substring(
                            str.length - 2,
                            str.length
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
```
