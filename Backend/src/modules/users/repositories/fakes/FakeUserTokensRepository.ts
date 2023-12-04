import { v4 as uuidV4 } from "uuid";

import { ICreateUserTokenDTO } from "@modules/users/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/users/infra/typeorm/entities/UserTokens";
import IUserTokensRepository from "../models/IUserTokensRepository";

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserTokens[] = [];

  public async create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      id: uuidV4(),
      userId,
      expiresDate,
      refreshToken,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens | undefined> {
    const userTokens = this.userTokens.find(
      (userToken) =>
        userToken.userId === userId && userToken.refreshToken === refreshToken
    );

    return userTokens;
  }

  async deleteById(id: string): Promise<void> {
    const findedIndex = this.userTokens.findIndex(
      (userToken) => userToken.id === id
    );

    this.userTokens.splice(findedIndex, 1);
  }
}

export default FakeUserTokensRepository;
