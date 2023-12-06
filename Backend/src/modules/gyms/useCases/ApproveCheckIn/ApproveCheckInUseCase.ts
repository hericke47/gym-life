import { CheckIn } from "@modules/gyms/infra/typeorm/entities/CheckIn";
import ICheckInRepository from "@modules/gyms/repositories/models/ICheckInRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import checkInConfig from "@config/checkIn";

interface IRequest {
  checkInId: string;
}

@injectable()
class ApproveCheckInUseCase {
  constructor(
    @inject("CheckInRepository")
    private checkInRepository: ICheckInRepository
  ) {}

  async execute({ checkInId }: IRequest): Promise<CheckIn> {
    const checkIn = await this.checkInRepository.findById(checkInId);

    if (!checkIn) {
      throw new AppError("Check-in does not exists");
    }

    const checkInApproveInterval =
      await this.checkInRepository.findByIntervalAndUserId(
        checkInConfig.approveInterval,
        undefined,
        checkIn.id
      );

    if (checkInApproveInterval.length <= 0) {
      throw new AppError("check-in is outside the approval range");
    }

    const updatedCheckIn = await this.checkInRepository.updatedCheckInApprove(
      checkIn
    );

    return updatedCheckIn;
  }
}

export { ApproveCheckInUseCase };
