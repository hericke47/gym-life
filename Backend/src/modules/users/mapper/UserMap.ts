/* eslint-disable camelcase */
import IUserResponseDTO from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    id,
    email,
    name,
    active,
    createdAt,
    isAdmin,
  }: User): IUserResponseDTO {
    const user = {
      id,
      email,
      name,
      active,
      createdAt,
      isAdmin,
    };

    return user;
  }
}
export { UserMap };
