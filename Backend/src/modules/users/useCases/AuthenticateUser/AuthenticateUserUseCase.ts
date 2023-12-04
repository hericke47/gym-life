import auth from "@config/auth";
import IUserRepository from "@modules/users/repositories/models/IUserRepository";
import IUserTokensRepository from "@modules/users/repositories/models/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/models/IDateProvider";
import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
    isAdmin: boolean;
    active: boolean;
  };
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const {
      expiresInToken,
      secretRefreshToken,
      secretToken,
      expiresInRefreshToken,
      expiresRefreshTokenDays,
    } = auth;

    const token = sign({}, secretToken, {
      subject: user.id,
      expiresIn: expiresInToken,
    });

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: user.id,
      expiresIn: expiresInRefreshToken,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      expiresRefreshTokenDays
    );

    await this.userTokensRepository.create({
      userId: user.id,
      refreshToken,
      expiresDate: refreshTokenExpiresDate,
    });

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        active: user.active,
      },
      token,
      refreshToken,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
