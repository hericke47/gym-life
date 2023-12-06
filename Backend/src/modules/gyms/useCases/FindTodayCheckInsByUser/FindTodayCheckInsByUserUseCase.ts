import { CheckIn } from "@modules/gyms/infra/typeorm/entities/CheckIn";
import ICheckInRepository from "@modules/gyms/repositories/models/ICheckInRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  userId: string;
}

@injectable()
class FindTodayCheckInsByUserUseCase {
  constructor(
    @inject("CheckInRepository")
    private checkInRepository: ICheckInRepository
  ) {}

  async execute({ userId }: IRequest): Promise<CheckIn[]> {
    const checkIn = await this.checkInRepository.findTodayByUserId(userId);

    return checkIn;
  }
}

export { FindTodayCheckInsByUserUseCase };
