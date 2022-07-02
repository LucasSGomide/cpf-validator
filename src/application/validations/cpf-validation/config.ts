import { ICpfValidation } from '@domain/validations/ICPfValidation'
import { EqualCharactersValidation } from '../equal-characters-validation/EqualCharactersValidation'
import { MinLengthValidation } from '../min-length-validation/MinLengthValidation'
import { CpfValidation } from './CpfValidation'

export const makeCpfValidation = (): ICpfValidation =>
    CpfValidation.build([
        new MinLengthValidation(11),
        new EqualCharactersValidation(),
    ])
