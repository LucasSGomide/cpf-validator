import { makeCpfValidation } from '@application/validations/cpf-validation/config'
import { User } from '@domain/entities'
import { InvalidFieldError } from '@domain/errors/InvalidFieldError'
import { IUserRepository } from '@domain/repository'
import { ICpfValidation } from '@domain/validations/ICPfValidation'
import { CreateUser } from './CreateUser'
import { makeUserRepositoryMock } from './mocks'

type SutTypes = {
    cpfValidation: ICpfValidation
    userRepository: IUserRepository
    userToCreate: User
    sut: CreateUser
}

const makeSut = ({ cpf }: { cpf?: string }): SutTypes => {
    const validCpf = '473.491.640-33'
    const cpfValidation = makeCpfValidation()
    const userRepository = makeUserRepositoryMock()
    const userToCreate = new User({
        name: 'any_valid_name',
        lastName: 'any_valid_lastname',
        cpf: cpf || validCpf,
    })

    return {
        sut: new CreateUser(userRepository, cpfValidation),
        cpfValidation,
        userRepository,
        userToCreate,
    }
}

describe('CreateUser', () => {
    test('Deve criar um novo usuário se o mesmo possuir CPF válido', async () => {
        const { sut, userToCreate, userRepository } = makeSut({})
        const createdUser = await sut.execute(userToCreate)
        expect(userRepository.create).toBeCalledTimes(1)
        expect(userRepository.create).toBeCalledWith(userToCreate)
        expect(createdUser).toEqual(
            new User({
                ...userToCreate,
                id: 'any_user_id',
                createdAt: new Date('2022-07-01'),
                updatedAt: new Date('2022-07-01'),
                deletedAt: null,
            })
        )
    })

    test('Deve lançar erro se o usuário possuir CPF inválido', async () => {
        const invalidCpf = '473.491.640-32'
        const { sut, userToCreate, userRepository } = makeSut({
            cpf: invalidCpf,
        })
        const promise = sut.execute(userToCreate)
        expect(promise).rejects.toEqual(new InvalidFieldError())
        expect(userRepository.create).not.toBeCalled()
    })
})
