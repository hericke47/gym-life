import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import { CreateGymController } from "@modules/gyms/useCases/CreateGym/CreateGymController";
import { ensureUserAuthenticated } from "../middlewares/ensureUserAuthenticated";
import ensureAdmin from "../middlewares/ensureAdmin";

const gymsRouter = Router();

const createGymController = new CreateGymController();

gymsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string(),
      phone: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    },
  }),
  ensureUserAuthenticated,
  ensureAdmin,
  createGymController.handle
);

export default gymsRouter;
