import FakeGymRepository from "@modules/gyms/repositories/fakes/FakeGymRepository";
import FakeCheckInRepository from "@modules/gyms/repositories/fakes/FakeCheckInRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import FakeHashProvider from "@shared/container/providers/HashProvider/fakes/FakeHashProvider";
import { CreateUserUseCase } from "@modules/users/useCases/CreateUser/CreateUserUseCase";
import ICreateGymDTO from "@modules/gyms/dtos/ICreateGymDTO";
import AppError from "@shared/errors/AppError";
import { CreateGymUseCase } from "../CreateGym/CreateGymUseCase";
import { ApproveCheckInUseCase } from "./ApproveCheckInUseCase";
import { CreateCheckInUseCase } from "../CreateCheckIn/CreateCheckInUseCase";

let fakeGymRepository: FakeGymRepository;
let fakeCheckInRepository: FakeCheckInRepository;
let createGym: CreateGymUseCase;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let approveCheckIn: ApproveCheckInUseCase;
let createCheckIn: CreateCheckInUseCase;
let createUser: CreateUserUseCase;

describe("Approve Check-in", () => {
  beforeEach(() => {
    fakeGymRepository = new FakeGymRepository();
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCheckInRepository = new FakeCheckInRepository();

    createGym = new CreateGymUseCase(fakeGymRepository);
    approveCheckIn = new ApproveCheckInUseCase(fakeCheckInRepository);
    createCheckIn = new CreateCheckInUseCase(
      fakeCheckInRepository,
      fakeGymRepository
    );
    createUser = new CreateUserUseCase(fakeUserRepository, fakeHashProvider);
  });

  it("should be able to approve a check-in", async () => {
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

    expect(checkInCreated.approved).toEqual(false);

    const approvedCheckIn = await approveCheckIn.execute({
      checkInId: checkInCreated.id,
    });

    expect(approvedCheckIn).toHaveProperty("id");
    expect(approvedCheckIn).toHaveProperty("gymId");
    expect(approvedCheckIn).toHaveProperty("userId");
    expect(approvedCheckIn.approved).toEqual(true);
  });

  it("should not be able to approve a check-in if check-in does not exists", async () => {
    const user: ICreateUserDTO = {
      name: "User john Doe",
      email: "userjhondoe@example.com",
      password: "example-password",
    };

    await createUser.execute(user);

    const gym: ICreateGymDTO = {
      name: "example-gym",
      description: "example-gym-description",
      phone: "48 999999999",
      latitude: -28.46754,
      longitude: -49.036143,
    };

    await createGym.execute(gym);

    await expect(
      approveCheckIn.execute({
        checkInId: "non-existent-check-in-id",
      })
    ).rejects.toEqual(new AppError("Check-in does not exists"));
  });
});
