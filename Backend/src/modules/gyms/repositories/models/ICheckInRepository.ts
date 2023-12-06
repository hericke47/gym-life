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
  findByIntervalAndUserId(userId: string, interval: string): Promise<CheckIn[]>;
}
