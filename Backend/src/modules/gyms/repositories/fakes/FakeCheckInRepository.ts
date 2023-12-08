import { v4 as uuidV4 } from "uuid";

import { CheckIn } from "@modules/gyms/infra/typeorm/entities/CheckIn";
import ICreateCheckInDTO from "@modules/gyms/dtos/ICreateCheckInDTO";
import ICheckInRepository from "../models/ICheckInRepository";

class FakeCheckInRepository implements ICheckInRepository {
  private checkIns: CheckIn[] = [];

  public async create(data: ICreateCheckInDTO): Promise<CheckIn> {
    const checkIn = new CheckIn();

    Object.assign(
      checkIn,
      { id: uuidV4() },
      {
        ...data,
        approved: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );

    this.checkIns.push(checkIn);

    return checkIn;
  }

  public async listByUserId(
    userId: string,
    take: number,
    skip: number
  ): Promise<{ checkIns: CheckIn[]; count: number }> {
    const filteredCheckIns = this.checkIns.filter(
      (checkIn) => checkIn.userId === userId
    );

    filteredCheckIns.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    const paginatedCheckIns = filteredCheckIns.slice(skip, skip + take);

    return {
      checkIns: paginatedCheckIns,
      count: filteredCheckIns.length,
    };
  }

  public async findTodayByUserId(userId: string): Promise<CheckIn[]> {
    const currentDate = new Date();
    const startOfDay = new Date(currentDate.toISOString().split("T")[0]);
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

    const filteredCheckIns = this.checkIns.filter((checkIn) => {
      const createdAt = new Date(checkIn.createdAt);
      return (
        createdAt >= startOfDay &&
        createdAt < endOfDay &&
        checkIn.userId === userId
      );
    });

    const sortedCheckIns = filteredCheckIns.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return sortedCheckIns;
  }

  public async findByIntervalAndUserId(
    interval: string,
    checkInId: string
  ): Promise<CheckIn[]> {
    const currentDate = new Date();
    const twentyMinutesAgo = new Date(currentDate.getTime() - 20 * 60 * 1000);

    const filteredCheckIns = this.checkIns.filter((checkIn) => {
      const createdAt = new Date(checkIn.createdAt);
      return (
        createdAt > twentyMinutesAgo &&
        createdAt < currentDate &&
        checkIn.id === checkInId
      );
    });

    return filteredCheckIns;
  }

  public async listCheckIns(
    take: number,
    skip: number
  ): Promise<{ checkIns: CheckIn[]; count: number }> {
    const sortedCheckIns = this.checkIns
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(skip, skip + take);

    const totalCount = this.checkIns.length;

    return {
      checkIns: sortedCheckIns,
      count: totalCount,
    };
  }

  public async updatedCheckInApprove(checkIn: CheckIn): Promise<CheckIn> {
    const findIndex = this.checkIns.findIndex(
      (findCheckIn) => findCheckIn.id === checkIn.id
    );

    this.checkIns[findIndex] = checkIn;

    return checkIn;
  }

  public async findById(checkInId: string): Promise<CheckIn | undefined> {
    const findGym = this.checkIns.find((checkIn) => checkIn.id === checkInId);

    return findGym;
  }
}

export default FakeCheckInRepository;
