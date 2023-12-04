import { Request, Response, NextFunction } from "express";

import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository";
import AppError from "@shared/errors/AppError";

export default async function ensureAdmin(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const userRepository = new UserRepository();
  const user = await userRepository.findById(id);

  if (!user?.isAdmin) {
    throw new AppError("User isn't admin");
  }

  return next();
}
