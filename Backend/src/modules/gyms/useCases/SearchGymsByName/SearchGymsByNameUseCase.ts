import { Gym } from "@modules/gyms/infra/typeorm/entities/Gym";
import IGymRepository from "@modules/gyms/repositories/models/IGymRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  skip: number;
  take: number;
}

@injectable()
class SearchGymsByNameUseCase {
  constructor(
    @inject("GymRepository")
    private gymRepository: IGymRepository
  ) {}

  async execute({ name, skip, take }: IRequest): Promise<{
    gyms: Gym[];
    count: number;
  }> {
    const gyms = await this.gymRepository.searchGymsByName(name, skip, take);

    return gyms;
  }
}

export { SearchGymsByNameUseCase };
