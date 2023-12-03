import FakeHashProvider from "@shared/container/providers/HashProvider/fakes/FakeHashProvider";
import AppError from "@shared/errors/AppError";

import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserUseCase(fakeUserRepository, fakeHashProvider);
  });
  it("should be able to create a new user", async () => {
    const user: ICreateUserDTO = {
      name: "User john Doe",
      email: "userjhondoe@example.com",
      password: "example-password",
    };

    const createdUser = await createUser.execute(user);

    expect(createdUser.name).toEqual(user.name);
    expect(createdUser.email).toEqual(user.email);
    expect(createdUser).toHaveProperty("id");
  });

  it("should not be able to create a new user whith email from another", async () => {
    const user: ICreateUserDTO = {
      name: "User john Doe",
      email: "userjhondoe@example.com",
      password: "example-password",
    };

    const anotherUserWithSameEmail = {
      name: "Another User",
      email: "userjhondoe@example.com",
      password: "another-example-password",
    };

    await createUser.execute(user);

    await expect(createUser.execute(anotherUserWithSameEmail)).rejects.toEqual(
      new AppError("Email address already used.")
    );
  });
});
