import { User } from '@domain/entities'
import { IUserRepository } from '@domain/repository'

const userMock = new User({
    name: 'any_user_name',
    lastName: 'any_user_last_name',
    cpf: 'any_valid_cpf',
})

export const makeUserRepositoryMock = (): IUserRepository => {
    const findByIdMock = jest.fn((param: { id: string }) =>
        Promise.resolve({
            ...userMock,
            id: 'any_user_id',
            createdAt: new Date('2022-07-01'),
            updatedAt: new Date('2022-07-01'),
            deletedAt: null,
        })
    )

    return {
        create: jest.fn(),
        findById: findByIdMock,
    }
}
