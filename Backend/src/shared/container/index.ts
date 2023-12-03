import "./providers";

import { container } from "tsyringe";

import IUserRepository from "@modules/users/repositories/models/IUserRepository";
import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository";
import IUserTokensRepository from "@modules/users/repositories/models/IUserTokensRepository";
import UserTokensRepository from "@modules/users/infra/typeorm/repositories/UserTokensRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
);
