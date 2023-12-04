import { Gym } from "@modules/gyms/infra/typeorm/entities/Gym";
import IGymRepository from "@modules/gyms/repositories/models/IGymRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  latitude: number;
  longitude: number;
}

@injectable()
class NearbyGymsUseCase {
  constructor(
    @inject("GymRepository")
    private gymRepository: IGymRepository
  ) {}

  async execute({ latitude, longitude }: IRequest): Promise<Gym[]> {
    const nearby = await this.gymRepository.nearbyGyms(latitude, longitude);

    return nearby;
  }
}

export { NearbyGymsUseCase };
