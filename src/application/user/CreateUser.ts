import { User } from '@domain/entities'
import { IUseCase } from '@application/protocols/IUseCase'
import { IUserRepository } from '@domain/repository'
import { ICpfValidation } from '@domain/validations/ICPfValidation'

export class CreateUser implements IUseCase {
    constructor(
        private userRepository: IUserRepository,
        private cpfValidation: ICpfValidation
    ) {}

    async execute(user: User): Promise<User> {
        this.cpfValidation.execute(user.cpf)

        const createdUser = await this.userRepository.create(user)

        return createdUser
    }
}
