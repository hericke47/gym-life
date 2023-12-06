import { CheckIn } from "@modules/gyms/infra/typeorm/entities/CheckIn";
import ICheckInRepository from "@modules/gyms/repositories/models/ICheckInRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  take: number;
  skip: number;
}

@injectable()
class ListCheckInsUseCase {
  constructor(
    @inject("CheckInRepository")
    private checkInRepository: ICheckInRepository
  ) {}

  async execute({ skip, take }: IRequest): Promise<{
    checkIns: CheckIn[];
    count: number;
  }> {
    const checkIns = await this.checkInRepository.listCheckIns(take, skip);

    return checkIns;
  }
}

export { ListCheckInsUseCase };
