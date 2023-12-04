import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import { CreateGymController } from "@modules/gyms/useCases/CreateGym/CreateGymController";
import { NearbyGymsController } from "@modules/gyms/useCases/NearbyGyms/NearbyGymsController";
import { ensureUserAuthenticated } from "../middlewares/ensureUserAuthenticated";
import ensureAdmin from "../middlewares/ensureAdmin";

const gymsRouter = Router();

const createGymController = new CreateGymController();
const nearbyGymsController = new NearbyGymsController();

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

gymsRouter.get("/", ensureUserAuthenticated, nearbyGymsController.handle);

export default gymsRouter;
