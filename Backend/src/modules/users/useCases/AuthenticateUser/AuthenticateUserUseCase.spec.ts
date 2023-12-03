import FakeHashProvider from "@shared/container/providers/HashProvider/fakes/FakeHashProvider";
import AppError from "@shared/errors/AppError";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import FakeUserTokensRepository from "@modules/users/repositories/fakes/FakeUserTokensRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let fakeUserTokenRepository: FakeUserTokensRepository;
let dateProvider: DayjsDateProvider;
let authenticateUser: AuthenticateUserUseCase;
let createUser: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUserTokenRepository = new FakeUserTokensRepository();
    dateProvider = new DayjsDateProvider();

    authenticateUser = new AuthenticateUserUseCase(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
      dateProvider
    );

    createUser = new CreateUserUseCase(fakeUserRepository, fakeHashProvider);
  });

  it("should be able to authenticate", async () => {
    const user: ICreateUserDTO = {
      name: "User john Doe",
      email: "Userjhondoe@example.com",
      password: "example-password",
    };

    const createdUser = await createUser.execute(user);

    const auth = await authenticateUser.execute({
      email: createdUser.email,
      password: createdUser.password,
    });

    expect(auth).toHaveProperty("token");
    expect(auth).toHaveProperty("refreshToken");
    expect(auth.user.name).toEqual(user.name);
    expect(auth.user.email).toEqual(user.email);
  });

  it("should not be able to authenticate if user does not exists", async () => {
    await expect(
      authenticateUser.execute({
        email: "non-existent-user-email@example.com",
        password: "example-password",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("should not be able to authenticate user with incorrect password", async () => {
    const user: ICreateUserDTO = {
      name: "User john Doe",
      email: "userjhondoe@example.com",
      password: "example-password",
    };

    const createdUser = await createUser.execute(user);

    await expect(
      authenticateUser.execute({
        email: createdUser.email,
        password: "incorrect-password",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});
