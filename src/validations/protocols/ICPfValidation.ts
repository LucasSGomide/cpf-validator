import { IValidation } from './IValidation'

export interface ICpfValidation {
    validators: IValidation[]
    cpf: string
    execute: (cpf: string) => Error
}
