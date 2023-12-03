import { v4 as uuidV4 } from "uuid";

import { User } from "@modules/users/infra/typeorm/entities/User";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IUserRepository from "../models/IUserRepository";

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(
      (user) => user.email === email && user.active === true
    );

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(
      user,
      { id: uuidV4() },
      {
        ...userData,
        active: true,
        isAdmin: false,
      }
    );

    this.users.push(user);

    return user;
  }

  async findById(userId: string): Promise<User | undefined> {
    const findUser = this.users.find(
      (user) => user.id === userId && user.active === true
    );

    return findUser;
  }
}

export default FakeUserRepository;
