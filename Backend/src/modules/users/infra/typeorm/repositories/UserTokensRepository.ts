import { getRepository, Repository } from "typeorm";

import IUserTokensRepository from "@modules/users/repositories/models/IUserTokensRepository";
import { ICreateUserTokenDTO } from "@modules/users/dtos/ICreateUserTokenDTO";
import { UserTokens } from "../entities/UserTokens";

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserTokens>;

  constructor() {
    this.ormRepository = getRepository(UserTokens);
  }

  async create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.ormRepository.create({
      expires_date: expiresDate,
      refresh_token: refreshToken,
      user_id: userId,
    });

    return this.ormRepository.save(userToken);
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens | undefined> {
    const userTokens = await this.ormRepository.findOne({
      user_id: userId,
      refresh_token: refreshToken,
    });

    return userTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UserTokensRepository;
