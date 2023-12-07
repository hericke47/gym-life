import { v4 as uuidV4 } from "uuid";

import ICreateGymDTO from "@modules/gyms/dtos/ICreateGymDTO";
import { Gym } from "@modules/gyms/infra/typeorm/entities/Gym";
import IGymRepository from "../models/IGymRepository";

class FakeGymRepository implements IGymRepository {
  private gyms: Gym[] = [];

  public async create(data: ICreateGymDTO): Promise<Gym> {
    const gym = new Gym();

    Object.assign(
      gym,
      { id: uuidV4() },
      {
        ...data,
        active: true,
      }
    );

    this.gyms.push(gym);

    return gym;
  }

  nearbyGyms(latitude: number, longitude: number): Promise<Gym[]> {
    throw new Error("Method not implemented.");
  }

  searchGymsByName(
    name: string,
    skip: number,
    take: number
  ): Promise<{ gyms: Gym[]; count: number }> {
    throw new Error("Method not implemented.");
  }

  public async findById(gymId: string): Promise<Gym | undefined> {
    const findGym = this.gyms.find(
      (gym) => gym.id === gymId && gym.active === true
    );

    return findGym;
  }
}

export default FakeGymRepository;
