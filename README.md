![JOB-STATUS](https://github.com/LucasSGomide/ecommerce-clean-arch/actions/workflows/github-action.yml/badge.svg)

## Welcome to the Clean Architecture E-Commerce Project

This repository is my personal implementation of the E-Commerce Project studied at [Clean Code & Clean Architecture Course](https://app.branas.io/public/products). 
### Objective
The main goal here is to create a simple e-commerce implementation using **_SOLID_** principles,**_Object Oriented Programming_**, **_Refactoring Techniques_**", **_Clean Architecture_**, **_Domain Driven Design_**, **_Test Driven Development_** and some **_Design Patterns_**.

---

## Applied Practices

### Good Practices
- **Conventional Commits Pattern**  
    - Enforced with: [Git Commit Message Linter](https://www.npmjs.com/package/git-commit-msg-linter)
- **No test breaking commits**
    - Helped by: [Lint Staged](lint-staged)
    - Enforced by: [Husky](https://www.npmjs.com/package/husky)

### Code Quality
- **Eslint**
    - Airbnb Typescript
    - Personal Rules
- **Prettier**
    - Default

### Tests
- **Jest**
    - Mapped Paths
    - Ts-Jest
- **Test Patterns**
    - Mocks
    - Spies
    - System Under Test (SUT)

### CI/CD
- **GitHub Actions**
    - Jobs:
        - Test
        - Eslint
        - Coveralls

---

## Challenges
### CPF Validation Refactor

-   Refactor challenge:
    -   [CPF Algorithm](https://www.macoratti.net/alg_cpf.htm)

### Function to Refactor:

-   Obs: The results are accessible in the _refactor/cpf-challenge_ branch into the SRC folder
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
