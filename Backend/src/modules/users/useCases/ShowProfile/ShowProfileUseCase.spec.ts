import FakeHashProvider from "@shared/container/providers/HashProvider/fakes/FakeHashProvider";
import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import { v4 as uuidV4 } from "uuid";
import AppError from "@shared/errors/AppError";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { ShowProfileUseCase } from "./ShowProfileUseCase";

let showProfileUseCase: ShowProfileUseCase;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserUseCase;

describe("Show Profile", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    showProfileUseCase = new ShowProfileUseCase(fakeUserRepository);

    createUser = new CreateUserUseCase(fakeUserRepository, fakeHashProvider);
  });

  it("should be able to show user profile", async () => {
    const user: ICreateUserDTO = {
      name: "User john Doe",
      email: "userjhondoe@example.com",
      password: "example-password",
    };

    const createdUser = await createUser.execute(user);

    const userProfile = await showProfileUseCase.execute({
      userId: createdUser.id,
    });

    expect(userProfile).toHaveProperty("id");
    expect(userProfile).toHaveProperty("email");
    expect(userProfile).toHaveProperty("name");
    expect(userProfile).toHaveProperty("active");
    expect(userProfile).toHaveProperty("createdAt");
    expect(userProfile).toHaveProperty("isAdmin");
  });

  it("should not be able to show user profile if user does not exists", async () => {
    await expect(
      showProfileUseCase.execute({
        userId: uuidV4(),
      })
    ).rejects.toEqual(new AppError("User not found"));
  });
});
