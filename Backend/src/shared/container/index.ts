import "./providers";

import { container } from "tsyringe";

import IUserRepository from "@modules/users/repositories/models/IUserRepository";
import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository";
import IUserTokensRepository from "@modules/users/repositories/models/IUserTokensRepository";
import UserTokensRepository from "@modules/users/infra/typeorm/repositories/UserTokensRepository";
import IGymRepository from "@modules/gyms/repositories/models/IGymRepository";
import GymRepository from "@modules/gyms/infra/typeorm/repositories/GymRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
);

container.registerSingleton<IGymRepository>("GymRepository", GymRepository);
