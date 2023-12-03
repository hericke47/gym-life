import { ICreateUserTokenDTO } from "@modules/users/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/users/infra/typeorm/entities/UserTokens";

interface IUserTokensRepository {
  create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens | undefined>;

  deleteById(id: string): Promise<void>;
}

export default IUserTokensRepository;
