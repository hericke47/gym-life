import FakeGymRepository from "@modules/gyms/repositories/fakes/FakeGymRepository";
import FakeCheckInRepository from "@modules/gyms/repositories/fakes/FakeCheckInRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import FakeHashProvider from "@shared/container/providers/HashProvider/fakes/FakeHashProvider";
import { CreateUserUseCase } from "@modules/users/useCases/CreateUser/CreateUserUseCase";
import ICreateGymDTO from "@modules/gyms/dtos/ICreateGymDTO";
import { CreateGymUseCase } from "../CreateGym/CreateGymUseCase";
import { CreateCheckInUseCase } from "../CreateCheckIn/CreateCheckInUseCase";
import { ListCheckInsByUserUseCase } from "./ListCheckInsByUserUseCase";

let fakeGymRepository: FakeGymRepository;
let fakeCheckInRepository: FakeCheckInRepository;
let createGym: CreateGymUseCase;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createCheckIn: CreateCheckInUseCase;
let createUser: CreateUserUseCase;
let listCheckInsByUser: ListCheckInsByUserUseCase;

describe("List check-ins by user", () => {
  beforeEach(() => {
    fakeGymRepository = new FakeGymRepository();
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCheckInRepository = new FakeCheckInRepository();

    createGym = new CreateGymUseCase(fakeGymRepository);
    createCheckIn = new CreateCheckInUseCase(
      fakeCheckInRepository,
      fakeGymRepository
    );
    createUser = new CreateUserUseCase(fakeUserRepository, fakeHashProvider);
    listCheckInsByUser = new ListCheckInsByUserUseCase(fakeCheckInRepository);
  });

  it("should be able to list user check-ins", async () => {
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

    const checkIns = await listCheckInsByUser.execute({
      skip: 0,
      take: 10,
      userId: createdUser.id,
    });

    expect(checkIns).toStrictEqual({
      checkIns: [checkInCreated],
      count: 1,
    });
  });
});
