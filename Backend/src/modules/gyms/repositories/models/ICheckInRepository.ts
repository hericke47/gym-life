import ICreateCheckInDTO from "@modules/gyms/dtos/ICreateCheckInDTO";
import { CheckIn } from "@modules/gyms/infra/typeorm/entities/CheckIn";

export default interface ICheckInRepository {
  create(data: ICreateCheckInDTO): Promise<CheckIn>;
  findByUserId(
    userId: string,
    onlyToday?: boolean,
    take?: number,
    skip?: number
  ): Promise<{
    checkIns: CheckIn[];
    count: number;
  }>;
  findByIntervalAndUserId(
    interval: string,
    userId?: string,
    checkInId?: string
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
