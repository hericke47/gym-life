import { User } from "@modules/users/infra/typeorm/entities/User";

import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(userId: string): Promise<User | undefined>;
}
