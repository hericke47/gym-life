import { CheckIn } from "@modules/gyms/infra/typeorm/entities/CheckIn";
import ICheckInRepository from "@modules/gyms/repositories/models/ICheckInRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  onlyToday?: boolean;
  userId: string;
}

@injectable()
class ListCheckInsByUserUseCase {
  constructor(
    @inject("CheckInRepository")
    private checkInRepository: ICheckInRepository
  ) {}

  async execute({ userId, onlyToday }: IRequest): Promise<CheckIn[]> {
    const checkIns = await this.checkInRepository.findByUserId(
      userId,
      onlyToday
    );

    return checkIns;
  }
}

export { ListCheckInsByUserUseCase };
