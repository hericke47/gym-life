import { CheckIn } from "@modules/gyms/infra/typeorm/entities/CheckIn";
import ICheckInRepository from "@modules/gyms/repositories/models/ICheckInRepository";
import IGymRepository from "@modules/gyms/repositories/models/IGymRepository";
import AppError from "@shared/errors/AppError";
import { calculateDistance } from "@utils/calculateDistance";
import { inject, injectable } from "tsyringe";

interface IRequest {
  userId: string;
  gymId: string;
  latitude: number;
  longitude: number;
}

@injectable()
class CreateCheckInUseCase {
  constructor(
    @inject("CheckInRepository")
    private checkInRepository: ICheckInRepository,

    @inject("GymRepository")
    private gymRepository: IGymRepository
  ) {}

  async execute({
    gymId,
    userId,
    latitude,
    longitude,
  }: IRequest): Promise<CheckIn> {
    const gym = await this.gymRepository.findById(gymId);

    if (!gym) {
      throw new AppError("Gym not found!");
    }

    const checkInLimit = await this.checkInRepository.findTodayByUserId(userId);

    if (checkInLimit.length >= 1) {
      throw new AppError("check-in limit reached");
    }

    const distance = calculateDistance(
      latitude,
      longitude,
      gym.latitude,
      gym.longitude
    ).toFixed(2);

    if (Number(distance) > 0.1) {
      throw new AppError("too far to check in");
    }

    const checkIn = await this.checkInRepository.create({
      gymId,
      userId,
    });

    return checkIn;
  }
}

export { CreateCheckInUseCase };
