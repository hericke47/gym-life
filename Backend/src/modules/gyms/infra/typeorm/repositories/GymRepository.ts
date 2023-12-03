import { getRepository, Repository } from "typeorm";

import IGymRepository from "@modules/gyms/repositories/models/IGymRepository";
import ICreateGymDTO from "@modules/gyms/dtos/ICreateGymDTO";
import { Gym } from "../entities/Gym";

class GymRepository implements IGymRepository {
  private ormRepository: Repository<Gym>;

  constructor() {
    this.ormRepository = getRepository(Gym);
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
