import { User } from '@domain/entities'
import { CreateUser } from './CreateUser'
import { makeUserRepositoryMock } from './mocks'

describe('CreateUser', () => {
    test('Deve criar um novo usuário se o mesmo possuir dados válidos', async () => {
        const userRepository = makeUserRepositoryMock()
        const userToCreate = new User({
            name: 'any_valid_name',
            lastName: 'any_valid_lastname',
            cpf: '473.491.640-33',
        })
        const sut = new CreateUser(userRepository)

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
})
