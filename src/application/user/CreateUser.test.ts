import { makeCpfValidation } from '@application/validations/cpf-validation/config'
import { User } from '@domain/entities'
import { InvalidFieldError } from '@domain/errors/InvalidFieldError'
import { CreateUser } from './CreateUser'
import { makeUserRepositoryMock } from './mocks'

describe('CreateUser', () => {
    test('Deve criar um novo usuário se o mesmo possuir CPF válido', async () => {
        const cpfValidation = makeCpfValidation()
        const userRepository = makeUserRepositoryMock()
        const userToCreate = new User({
            name: 'any_valid_name',
            lastName: 'any_valid_lastname',
            cpf: '473.491.640-33',
        })
        const sut = new CreateUser(userRepository, cpfValidation)

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
        const cpfValidation = makeCpfValidation()
        const userRepository = makeUserRepositoryMock()
        const userToCreate = new User({
            name: 'any_valid_name',
            lastName: 'any_valid_lastname',
            cpf: '473.491.640-32',
        })
        const sut = new CreateUser(userRepository, cpfValidation)

        const promise = sut.execute(userToCreate)

        expect(promise).rejects.toEqual(new InvalidFieldError())
        expect(userRepository.create).not.toBeCalled()
    })
})
