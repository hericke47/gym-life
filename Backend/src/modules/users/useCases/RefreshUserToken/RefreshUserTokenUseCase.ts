import auth from "@config/auth";
import IUserTokensRepository from "@modules/users/repositories/models/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/models/IDateProvider";
import AppError from "@shared/errors/AppError";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refreshToken: string;
}

@injectable()
class RefreshUserTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(refreshTokenRequest: string): Promise<ITokenResponse> {
    const {
      secretRefreshToken,
      expiresInRefreshToken,
      expiresRefreshTokenDays,
      expiresInToken,
      secretToken,
    } = auth;

    const { email, sub } = verify(
      refreshTokenRequest,
      secretRefreshToken
    ) as IPayload;

    const userId = sub;

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        userId,
        refreshTokenRequest
      );

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!");
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: sub,
      expiresIn: expiresInRefreshToken,
    });

    const expiresDate = this.dateProvider.addDays(expiresRefreshTokenDays);

    await this.userTokensRepository.create({
      expiresDate,
      refreshToken,
      userId,
    });

    const newToken = sign({}, secretToken, {
      subject: userId,
      expiresIn: expiresInToken,
    });

    return {
      refreshToken,
      token: newToken,
    };
  }
}

export { RefreshUserTokenUseCase };
