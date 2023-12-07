import FakeGymRepository from "@modules/gyms/repositories/fakes/FakeGymRepository";
import ICreateGymDTO from "@modules/gyms/dtos/ICreateGymDTO";
import { CreateGymUseCase } from "../CreateGym/CreateGymUseCase";
import { NearbyGymsUseCase } from "./NearbyGymsUseCase";

let fakeGymRepository: FakeGymRepository;
let nearbyGyms: NearbyGymsUseCase;
let createGym: CreateGymUseCase;

describe("Search nearby gyms", () => {
  beforeEach(() => {
    fakeGymRepository = new FakeGymRepository();

    createGym = new CreateGymUseCase(fakeGymRepository);

    nearbyGyms = new NearbyGymsUseCase(fakeGymRepository);
  });

  it("should be able to search nearby gyms", async () => {
    const firstGym: ICreateGymDTO = {
      name: "example-gym",
      description: "example-gym-description",
      phone: "48 999999999",
      latitude: -28.46754,
      longitude: -49.036143,
    };

    const secondGym: ICreateGymDTO = {
      name: "second-distant-gym",
      description: "second-gym-description",
      phone: "48 999999999",
      latitude: -33.8688,
      longitude: 151.2093,
    };

    const firstGymCreated = await createGym.execute(firstGym);
    await createGym.execute(secondGym);

    const gyms = await nearbyGyms.execute({
      latitude: -28.46754,
      longitude: -49.036143,
    });

    expect(gyms).toStrictEqual([firstGymCreated]);
  });
});
