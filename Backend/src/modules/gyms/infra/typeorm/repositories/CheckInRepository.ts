import { getRepository, Raw, Repository } from "typeorm";

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

  public async findByUserId(
    userId: string,
    onlyToday?: boolean
  ): Promise<CheckIn[]> {
    const where = {
      userId,
    };

    if (onlyToday) {
      Object.assign(where, {
        createdAt: Raw(
          (alias) =>
            `${alias} >= CURRENT_DATE AND ${alias} < CURRENT_DATE + INTERVAL '1 day'`
        ),
      });
    }

    const checIns = await this.ormRepository.find({
      where,
    });

    return checIns;
  }
}

export default CheckInRepository;
