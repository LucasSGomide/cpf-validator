export interface IValidation {
    field: string

    execute(value: any): Error
}
