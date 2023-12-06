import { getRepository, Raw, Repository } from "typeorm";

import ICheckInRepository from "@modules/gyms/repositories/models/ICheckInRepository";
import ICreateCheckInDTO from "@modules/gyms/dtos/ICreateCheckInDTO";
import checkInConfig from "@config/checkIn";
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
    onlyToday?: boolean,
    take?: number,
    skip?: number
  ): Promise<{
    checkIns: CheckIn[];
    count: number;
  }> {
    const where = {
      userId,
    };

    if (onlyToday) {
      Object.assign(where, {
        createdAt: Raw(
          (alias) =>
            `${alias} >= CURRENT_DATE AT TIME ZONE 'UTC' AT TIME ZONE 'GMT-3' AND ${alias} < (CURRENT_DATE + INTERVAL '1 day') AT TIME ZONE 'UTC' AT TIME ZONE 'GMT-3'`
        ),
      });
    }

    const checkIns = await this.ormRepository.findAndCount({
      where,
      join: {
        alias: "checkIn",
        leftJoinAndSelect: {
          gym: "checkIn.gym",
        },
      },
      order: {
        createdAt: onlyToday ? "ASC" : "DESC",
      },
      skip: skip || 0,
      take: onlyToday ? checkInConfig.checkInLimitPerDay : take,
    });

    return {
      checkIns: checkIns[0],
      count: checkIns[1],
    };
  }

  public async findByIntervalAndUserId(
    userId: string,
    interval: string
  ): Promise<CheckIn[]> {
    const checkIns = await this.ormRepository.query(`
      select id, created_at from check_ins where
        check_ins.created_at > CURRENT_TIMESTAMP - INTERVAL '${interval}' and
        check_ins.created_at < CURRENT_TIMESTAMP and
        check_ins.user_id = '${userId}' and
        check_ins.approved = false
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
}

export default CheckInRepository;
