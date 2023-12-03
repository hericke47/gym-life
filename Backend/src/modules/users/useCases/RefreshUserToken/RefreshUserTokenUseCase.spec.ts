import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import FakeHashProvider from "@shared/container/providers/HashProvider/fakes/FakeHashProvider";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import FakeUserTokensRepository from "@modules/users/repositories/fakes/FakeUserTokensRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import { RefreshUserTokenUseCase } from "./RefreshUserTokenUseCase";
import { AuthenticateUserUseCase } from "../AuthenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";

let refreshUserTokenUseCase: RefreshUserTokenUseCase;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUser: CreateUserUseCase;
let fakeUserTokenRepository: FakeUserTokensRepository;
let dateProvider: DayjsDateProvider;

describe("Refresh User Token", () => {
  beforeEach(() => {
    fakeUserTokenRepository = new FakeUserTokensRepository();
    dateProvider = new DayjsDateProvider();
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    refreshUserTokenUseCase = new RefreshUserTokenUseCase(
      fakeUserTokenRepository,
      dateProvider
    );

    authenticateUserUseCase = new AuthenticateUserUseCase(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
      dateProvider
    );

    createUser = new CreateUserUseCase(fakeUserRepository, fakeHashProvider);
  });

  it("should be able to generate a new token and delete old refresh token", async () => {
    const deleteOldRefreshToken = jest.spyOn(
      fakeUserTokenRepository,
      "deleteById"
    );

    const user: ICreateUserDTO = {
      name: "User john Doe",
      email: "userjhondoe@example.com",
      password: "example-password",
    };

    const createdUser = await createUser.execute(user);

    const auth = await authenticateUserUseCase.execute({
      email: createdUser.email,
      password: createdUser.password,
    });

    const userToken = await fakeUserTokenRepository.findByUserIdAndRefreshToken(
      createdUser.id,
      auth.refreshToken
    );

    const refreshToken = await refreshUserTokenUseCase.execute(
      auth.refreshToken
    );

    expect(refreshToken).toHaveProperty("token");
    expect(refreshToken).toHaveProperty("refreshToken");
    expect(deleteOldRefreshToken).toHaveBeenCalledWith(userToken?.id);
  });

  it("should not be able to generate a new token for a non existent user", async () => {
    const refreshTokenForANonExistentUse = sign(
      { email: "false@example.com" },
      auth.secretRefreshToken
    );

    await expect(
      refreshUserTokenUseCase.execute(refreshTokenForANonExistentUse)
    ).rejects.toEqual(new AppError("Refresh Token does not exists!"));
  });
});
