import { User } from "@modules/users/infra/typeorm/entities/User";
import IUserRepository from "@modules/users/repositories/models/IUserRepository";
import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Email address already used.");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export { CreateUserUseCase };
