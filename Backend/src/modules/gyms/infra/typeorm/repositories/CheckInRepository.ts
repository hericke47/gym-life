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

  public async listByUserId(
    userId: string,
    take: number,
    skip: number
  ): Promise<{
    checkIns: CheckIn[];
    count: number;
  }> {
    const checkIns = await this.ormRepository.findAndCount({
      where: {
        userId,
      },
      join: {
        alias: "checkIn",
        leftJoinAndSelect: {
          gym: "checkIn.gym",
        },
      },
      order: {
        createdAt: "DESC",
      },
      skip,
      take,
    });

    return {
      checkIns: checkIns[0],
      count: checkIns[1],
    };
  }

  public async findByIntervalAndUserId(
    interval: string,
    checkInId: string
  ): Promise<CheckIn[]> {
    const checkIns = await this.ormRepository.query(`
      select id, created_at from check_ins where
        check_ins.created_at > CURRENT_TIMESTAMP - INTERVAL '${interval}' and
        check_ins.created_at < CURRENT_TIMESTAMP and
        check_ins.id = '${checkInId}'
    `);

    return checkIns;
  }

  public async listCheckIns(
    take: number,
    skip: number
  ): Promise<{ checkIns: CheckIn[]; count: number }> {
    const checkIns = await this.ormRepository.findAndCount({
      join: {
        alias: "checkIn",
        leftJoinAndSelect: {
          gym: "checkIn.gym",
          user: "checkIn.user",
        },
      },
      skip,
      take,
      order: {
        createdAt: "DESC",
      },
    });

    return {
      checkIns: checkIns[0],
      count: checkIns[1],
    };
  }

  public async updatedCheckInApprove(checkIn: CheckIn): Promise<CheckIn> {
    checkIn.approved = true;

    await this.ormRepository.save(checkIn);

    return checkIn;
  }

  public async findById(checkInId: string): Promise<CheckIn | undefined> {
    const checkIn = await this.ormRepository.findOne({
      where: {
        id: checkInId,
      },
    });

    return checkIn;
  }

  public async findTodayByUserId(userId: string): Promise<CheckIn[]> {
    const checkIn = await this.ormRepository.find({
      where: {
        userId,
        createdAt: Raw(
          (alias) =>
            `${alias} >= CURRENT_DATE AT TIME ZONE 'UTC' AT TIME ZONE 'GMT-3' AND ${alias} < (CURRENT_DATE + INTERVAL '1 day') AT TIME ZONE 'UTC' AT TIME ZONE 'GMT-3'`
        ),
      },
      order: {
        createdAt: "ASC",
      },
    });

    return checkIn;
  }
}

export default CheckInRepository;
