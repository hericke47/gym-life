/* eslint-disable camelcase */
import IUserResponseDTO from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    id,
    email,
    name,
    active,
    created_at,
    is_admin,
  }: User): IUserResponseDTO {
    const user = {
      id,
      email,
      name,
      active,
      created_at,
      is_admin,
    };

    return user;
  }
}
export { UserMap };
