import { User } from '@domain/entities'
import { IUseCase } from '@application/protocols/IUseCase'
import { IUserRepository } from '@domain/repository'

export class CreateUser implements IUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(user: User): Promise<User> {
        const createdUser = await this.userRepository.create(user)

        return createdUser
    }
}
