import FakeGymRepository from "@modules/gyms/repositories/fakes/FakeGymRepository";
import ICreateGymDTO from "@modules/gyms/dtos/ICreateGymDTO";
import { SearchGymsByNameUseCase } from "./SearchGymsByNameUseCase";
import { CreateGymUseCase } from "../CreateGym/CreateGymUseCase";

let fakeGymRepository: FakeGymRepository;
let searchGymsByNameUsecase: SearchGymsByNameUseCase;
let createGym: CreateGymUseCase;

describe("Search gyms by name", () => {
  beforeEach(() => {
    fakeGymRepository = new FakeGymRepository();

    searchGymsByNameUsecase = new SearchGymsByNameUseCase(fakeGymRepository);

    createGym = new CreateGymUseCase(fakeGymRepository);
  });

  it("should be able to find a gym by name", async () => {
    const firstGym: ICreateGymDTO = {
      name: "example-gym",
      description: "example-gym-description",
      phone: "48 999999999",
      latitude: -28.46754,
      longitude: -49.036143,
    };

    const secondGym: ICreateGymDTO = {
      name: "second-gym",
      description: "second-gym-description",
      phone: "48 999999999",
      latitude: -28.46754,
      longitude: -49.036143,
    };

    await createGym.execute(firstGym);
    const createdSecondGym = await createGym.execute(secondGym);

    const gyms = await searchGymsByNameUsecase.execute({
      name: "sec",
      skip: 0,
      take: 10,
    });

    expect(gyms).toStrictEqual({
      gyms: [createdSecondGym],
      count: 1,
    });
  });
});
