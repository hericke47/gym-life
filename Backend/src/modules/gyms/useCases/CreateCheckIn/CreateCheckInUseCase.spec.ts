import FakeGymRepository from "@modules/gyms/repositories/fakes/FakeGymRepository";
import ICreateGymDTO from "@modules/gyms/dtos/ICreateGymDTO";
import { CreateUserUseCase } from "@modules/users/useCases/CreateUser/CreateUserUseCase";
import FakeHashProvider from "@shared/container/providers/HashProvider/fakes/FakeHashProvider";
import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import FakeCheckInRepository from "@modules/gyms/repositories/fakes/FakeCheckInRepository";
import AppError from "@shared/errors/AppError";
import { CreateGymUseCase } from "../CreateGym/CreateGymUseCase";
import { CreateCheckInUseCase } from "./CreateCheckInUseCase";

let fakeGymRepository: FakeGymRepository;
let createGym: CreateGymUseCase;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserUseCase;
let createCheckIn: CreateCheckInUseCase;
let fakeCheckInRepository: FakeCheckInRepository;
describe("Create Check-In", () => {
  beforeEach(() => {
    fakeGymRepository = new FakeGymRepository();
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCheckInRepository = new FakeCheckInRepository();

    createUser = new CreateUserUseCase(fakeUserRepository, fakeHashProvider);
    createGym = new CreateGymUseCase(fakeGymRepository);
    createCheckIn = new CreateCheckInUseCase(
      fakeCheckInRepository,
      fakeGymRepository
    );
  });

  it("should be able to create a check-in", async () => {
    const user: ICreateUserDTO = {
      name: "User john Doe",
      email: "userjhondoe@example.com",
      password: "example-password",
    };

    const createdUser = await createUser.execute(user);

    const gym: ICreateGymDTO = {
      name: "example-gym",
      description: "example-gym-description",
      phone: "48 999999999",
      latitude: -28.46754,
      longitude: -49.036143,
    };

    const createdGym = await createGym.execute(gym);

    const checkInCreated = await createCheckIn.execute({
      gymId: createdGym.id,
      userId: createdUser.id,
      latitude: -28.46754,
      longitude: -49.036143,
    });

    expect(checkInCreated).toHaveProperty("id");
    expect(checkInCreated).toHaveProperty("gymId");
    expect(checkInCreated).toHaveProperty("userId");
    expect(checkInCreated).toHaveProperty("approved");
  });

  it("should not be able to create a check-in if gym does not exists", async () => {
    const user: ICreateUserDTO = {
      name: "User john Doe",
      email: "userjhondoe@example.com",
      password: "example-password",
    };

    const createdUser = await createUser.execute(user);

    await expect(
      createCheckIn.execute({
        gymId: "non-existent-gym-id",
        userId: createdUser.id,
        latitude: -28.46754,
        longitude: -49.036143,
      })
    ).rejects.toEqual(new AppError("Gym not found!"));
  });

  it("should not be able to check-in with someone already done today", async () => {
    const user: ICreateUserDTO = {
      name: "User john Doe",
      email: "userjhondoe@example.com",
      password: "example-password",
    };

    const createdUser = await createUser.execute(user);

    const gym: ICreateGymDTO = {
      name: "example-gym",
      description: "example-gym-description",
      phone: "48 999999999",
      latitude: -28.46754,
      longitude: -49.036143,
    };

    const createdGym = await createGym.execute(gym);

    const checkInData = {
      gymId: createdGym.id,
      userId: createdUser.id,
      latitude: -28.46754,
      longitude: -49.036143,
    };

    await createCheckIn.execute(checkInData);

    await expect(createCheckIn.execute(checkInData)).rejects.toEqual(
      new AppError("check-in limit reached")
    );
  });

  it("should not be able to check-in if gym is too far", async () => {
    const user: ICreateUserDTO = {
      name: "User john Doe",
      email: "userjhondoe@example.com",
      password: "example-password",
    };

    const createdUser = await createUser.execute(user);

    const gym: ICreateGymDTO = {
      name: "example-gym",
      description: "example-gym-description",
      phone: "48 999999999",
      latitude: -28.46754,
      longitude: -49.036143,
    };

    const createdGym = await createGym.execute(gym);

    const checkInData = {
      gymId: createdGym.id,
      userId: createdUser.id,
      latitude: -33.8688,
      longitude: 151.2093,
    };

    await expect(createCheckIn.execute(checkInData)).rejects.toEqual(
      new AppError("too far to check in")
    );
  });
});
