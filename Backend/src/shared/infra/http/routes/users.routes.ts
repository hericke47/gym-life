import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/CreateUser/CreateUserController";

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    },
  }),
  createUserController.handle
);

export default usersRouter;
