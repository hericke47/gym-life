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
        id,
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
        ) <= 10
      AND
          gyms.active = true
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
        active: true,
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

  public async findById(gymId: string): Promise<Gym | undefined> {
    const gym = await this.ormRepository.findOne({
      where: { id: gymId, active: true },
    });

    return gym;
  }
}

export default GymRepository;
