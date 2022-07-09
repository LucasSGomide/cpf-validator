export interface ICpfValidation {
    getValue: () => string
    execute: (cpf: string) => Error
}
