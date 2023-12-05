import { getRepository, Repository } from "typeorm";

import ICheckInRepository from "@modules/gyms/repositories/models/ICheckInRepository";
import ICreateCheckInDTO from "@modules/gyms/dtos/ICreateCheckInDTO";
import { CheckIn } from "../entities/CheckIn";

class CheckInRepository implements ICheckInRepository {
  private ormRepository: Repository<CheckIn>;

  constructor() {
    this.ormRepository = getRepository(CheckIn);
  }

  public async create(data: ICreateCheckInDTO): Promise<CheckIn> {
    const gym = this.ormRepository.create(data);

    return this.ormRepository.save({
      ...gym,
      approved: false,
    });
  }
}

export default CheckInRepository;
