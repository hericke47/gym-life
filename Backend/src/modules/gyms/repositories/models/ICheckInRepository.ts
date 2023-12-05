import ICreateCheckInDTO from "@modules/gyms/dtos/ICreateCheckInDTO";
import { CheckIn } from "@modules/gyms/infra/typeorm/entities/CheckIn";

export default interface ICheckInRepository {
  create(data: ICreateCheckInDTO): Promise<CheckIn>;
}
