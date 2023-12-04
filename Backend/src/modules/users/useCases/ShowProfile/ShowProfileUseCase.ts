import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import IUserRepository from "@modules/users/repositories/models/IUserRepository";
import { UserMap } from "@modules/users/mapper/UserMap";
import IUserResponseDTO from "@modules/users/dtos/IUserResponseDTO";

interface IRequest {
  userId: string;
}

@injectable()
class ShowProfileUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  public async execute({ userId }: IRequest): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found");
    }

    return UserMap.toDTO(user);
  }
}

export { ShowProfileUseCase };
