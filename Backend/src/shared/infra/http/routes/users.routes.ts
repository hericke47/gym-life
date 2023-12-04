import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/CreateUser/CreateUserController";
import { ShowProfileController } from "@modules/users/useCases/ShowProfile/ShowProfileController";
import { ensureUserAuthenticated } from "../middlewares/ensureUserAuthenticated";

const usersRouter = Router();

const createUserController = new CreateUserController();
const showProfileController = new ShowProfileController();

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

usersRouter.get(
  "/profile",
  ensureUserAuthenticated,
  showProfileController.handle
);

export default usersRouter;
