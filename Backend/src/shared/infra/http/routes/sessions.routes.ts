import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import { AuthenticateUserController } from "@modules/users/useCases/AuthenticateUser/AuthenticateUserController";
import { RefreshUserTokenController } from "@modules/users/useCases/RefreshUserToken/RefreshUserTokenController";

const sessionsRouter = Router();
const authenticateUserController = new AuthenticateUserController();
const refreshUserTokenController = new RefreshUserTokenController();

sessionsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authenticateUserController.handle
);

sessionsRouter.post(
  "/refreshToken",
  celebrate({
    [Segments.BODY]: {
      refreshToken: Joi.string().required(),
    },
  }),
  refreshUserTokenController.handle
);

export default sessionsRouter;
