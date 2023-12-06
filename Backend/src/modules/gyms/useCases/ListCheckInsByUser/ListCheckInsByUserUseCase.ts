import { CheckIn } from "@modules/gyms/infra/typeorm/entities/CheckIn";
import ICheckInRepository from "@modules/gyms/repositories/models/ICheckInRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  onlyToday?: boolean;
  userId: string;
  take: number;
  skip: number;
}

@injectable()
class ListCheckInsByUserUseCase {
  constructor(
    @inject("CheckInRepository")
    private checkInRepository: ICheckInRepository
  ) {}

  async execute({ userId, onlyToday, skip, take }: IRequest): Promise<{
    checkIns: CheckIn[];
    count: number;
  }> {
    const checkIns = await this.checkInRepository.findByUserId(
      userId,
      onlyToday,
      take,
      skip
    );

    return checkIns;
  }
}

export { ListCheckInsByUserUseCase };
