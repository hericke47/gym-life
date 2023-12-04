import ICreateGymDTO from "@modules/gyms/dtos/ICreateGymDTO";
import { Gym } from "@modules/gyms/infra/typeorm/entities/Gym";

export default interface IGymRepository {
  create(data: ICreateGymDTO): Promise<Gym>;
  nearbyGyms(latitude: number, longitude: number): Promise<Gym[]>;
  searchGymsByName(
    name: string,
    skip: number,
    take: number
  ): Promise<{
    gyms: Gym[];
    count: number;
  }>;
}
