import { Gym } from "@modules/gyms/infra/typeorm/entities/Gym";
import IGymRepository from "@modules/gyms/repositories/models/IGymRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
  phone: string;
  latitude: number;
  longitude: number;
}

@injectable()
class CreateGymUseCase {
  constructor(
    @inject("GymRepository")
    private gymRepository: IGymRepository
  ) {}

  async execute({
    description,
    latitude,
    longitude,
    name,
    phone,
  }: IRequest): Promise<Gym> {
    const gym = await this.gymRepository.create({
      description,
      latitude,
      longitude,
      name,
      phone,
    });

    return gym;
  }
}

export { CreateGymUseCase };
