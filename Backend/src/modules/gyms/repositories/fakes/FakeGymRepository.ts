import { v4 as uuidV4 } from "uuid";

import ICreateGymDTO from "@modules/gyms/dtos/ICreateGymDTO";
import { Gym } from "@modules/gyms/infra/typeorm/entities/Gym";
import { calculateDistance } from "@utils/calculateDistance";
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

  public async nearbyGyms(latitude: number, longitude: number): Promise<Gym[]> {
    const radius = 10; // Raio em quilômetros

    const filteredGyms = this.gyms.filter((gym) => {
      const distance = calculateDistance(
        latitude,
        longitude,
        gym.latitude,
        gym.longitude
      );

      return distance <= radius && gym.active;
    });

    return filteredGyms;
  }

  public async searchGymsByName(
    name: string,
    skip: number,
    take: number
  ): Promise<{ gyms: Gym[]; count: number }> {
    const filteredGyms = this.gyms.filter(
      (gym) => gym.name.toLowerCase().includes(name.toLowerCase()) && gym.active
    );

    const paginatedGyms = filteredGyms.slice(skip, skip + take);

    return {
      gyms: paginatedGyms,
      count: filteredGyms.length,
    };
  }

  public async findById(gymId: string): Promise<Gym | undefined> {
    const findGym = this.gyms.find(
      (gym) => gym.id === gymId && gym.active === true
    );

    return findGym;
  }
}

export default FakeGymRepository;
