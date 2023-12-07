import FakeGymRepository from "@modules/gyms/repositories/fakes/FakeGymRepository";
import ICreateGymDTO from "@modules/gyms/dtos/ICreateGymDTO";
import { CreateGymUseCase } from "./CreateGymUseCase";

let fakeGymRepository: FakeGymRepository;
let createGym: CreateGymUseCase;

describe("Create Gym", () => {
  beforeEach(() => {
    fakeGymRepository = new FakeGymRepository();

    createGym = new CreateGymUseCase(fakeGymRepository);
  });

  it("should be able to create a gym", async () => {
    const gym: ICreateGymDTO = {
      name: "example-gym",
      description: "example-gym-description",
      phone: "48 999999999",
      latitude: -28.46754,
      longitude: -49.036143,
    };

    const createdGym = await createGym.execute(gym);

    expect(createdGym).toHaveProperty("id");
    expect(createdGym).toHaveProperty("description");
    expect(createdGym).toHaveProperty("name");
    expect(createdGym).toHaveProperty("active");
    expect(createdGym).toHaveProperty("phone");
    expect(createdGym).toHaveProperty("latitude");
    expect(createdGym).toHaveProperty("longitude");
  });
});
