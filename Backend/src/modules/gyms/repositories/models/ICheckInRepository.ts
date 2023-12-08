import ICreateCheckInDTO from "@modules/gyms/dtos/ICreateCheckInDTO";
import { CheckIn } from "@modules/gyms/infra/typeorm/entities/CheckIn";

export default interface ICheckInRepository {
  create(data: ICreateCheckInDTO): Promise<CheckIn>;
  listByUserId(
    userId: string,
    take: number,
    skip: number
  ): Promise<{
    checkIns: CheckIn[];
    count: number;
  }>;
  findTodayByUserId(userId: string): Promise<CheckIn[]>;
  findByIntervalAndUserId(
    interval: string,
    checkInId: string
  ): Promise<CheckIn[]>;
  listCheckIns(
    take: number,
    skip: number
  ): Promise<{
    checkIns: CheckIn[];
    count: number;
  }>;
  updatedCheckInApprove(checkIn: CheckIn): Promise<CheckIn>;
  findById(checkInId: string): Promise<CheckIn | undefined>;
}
