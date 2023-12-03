import { getRepository, Repository } from "typeorm";

import IUserRepository from "@modules/users/repositories/models/IUserRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import { User } from "../entities/User";

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    return this.ormRepository.save({
      ...user,
      active: true,
      is_admin: false,
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email, active: true },
    });

    return user;
  }

  async findById(userId: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id: userId, active: true },
    });

    return user;
  }
}

export default UserRepository;
