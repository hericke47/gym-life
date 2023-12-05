import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/CreateUser/CreateUserController";
import { ShowProfileController } from "@modules/users/useCases/ShowProfile/ShowProfileController";
import { ListCheckInsByUserController } from "@modules/gyms/useCases/ListCheckInsByUser/ListCheckInsByUserController";
import { ensureUserAuthenticated } from "../middlewares/ensureUserAuthenticated";

const usersRouter = Router();

const createUserController = new CreateUserController();
const showProfileController = new ShowProfileController();
const ListCheckInsByUser = new ListCheckInsByUserController();

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

usersRouter.get(
  "/checkIns",
  ensureUserAuthenticated,
  ListCheckInsByUser.handle
);

export default usersRouter;
