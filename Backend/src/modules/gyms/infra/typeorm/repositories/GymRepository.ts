import { getRepository, Like, Repository } from "typeorm";

import IGymRepository from "@modules/gyms/repositories/models/IGymRepository";
import ICreateGymDTO from "@modules/gyms/dtos/ICreateGymDTO";
import { Gym } from "../entities/Gym";

class GymRepository implements IGymRepository {
  private ormRepository: Repository<Gym>;

  constructor() {
    this.ormRepository = getRepository(Gym);
  }

  public async nearbyGyms(latitude: number, longitude: number): Promise<Gym[]> {
    // 6371 = Raio médio da terra
    return this.ormRepository.query(`
      SELECT
        name,
        description,
        phone,
        latitude,
        longitude
      FROM
        gyms
      WHERE
        6371 * ACOS(
            SIN(RADIANS(${latitude})) * SIN(RADIANS(latitude)) +
            COS(RADIANS(${latitude})) * COS(RADIANS(latitude)) *
            COS(RADIANS(${longitude} - longitude))
        ) <= 10;
    `);
  }

  public async searchGymsByName(
    name: string,
    skip: number,
    take: number
  ): Promise<{
    gyms: Gym[];
    count: number;
  }> {
    const gyms = await this.ormRepository.findAndCount({
      where: {
        name: Like(`%${name}%`),
      },
      skip,
      take,
    });

    return {
      gyms: gyms[0],
      count: gyms[1],
    };
  }

  public async create(data: ICreateGymDTO): Promise<Gym> {
    const gym = this.ormRepository.create(data);

    return this.ormRepository.save({
      ...gym,
      active: true,
    });
  }
}

export default GymRepository;
