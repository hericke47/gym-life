import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import { CreateGymController } from "@modules/gyms/useCases/CreateGym/CreateGymController";
import { NearbyGymsController } from "@modules/gyms/useCases/NearbyGyms/NearbyGymsController";
import { SearchGymsByNameController } from "@modules/gyms/useCases/SearchGymsByName/SearchGymsByNameController";
import { CreateCheckInController } from "@modules/gyms/useCases/CreateCheckIn/CreateCheckInController";
import { ListCheckInsController } from "@modules/gyms/useCases/ListCheckIns/ListCheckInsController";
import { ApproveCheckInController } from "@modules/gyms/useCases/ApproveCheckIn/ApproveCheckInController";
import { ensureUserAuthenticated } from "../middlewares/ensureUserAuthenticated";
import ensureAdmin from "../middlewares/ensureAdmin";

const gymsRouter = Router();

const createGymController = new CreateGymController();
const nearbyGymsController = new NearbyGymsController();
const searchGymsByName = new SearchGymsByNameController();
const createCheckInController = new CreateCheckInController();
const listCheckInsController = new ListCheckInsController();
const approveCheckInController = new ApproveCheckInController();

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
gymsRouter.get("/search", ensureUserAuthenticated, searchGymsByName.handle);
gymsRouter.post(
  "/checkIn",
  celebrate({
    [Segments.BODY]: {
      gymId: Joi.string().uuid().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    },
  }),
  ensureUserAuthenticated,
  createCheckInController.handle
);

gymsRouter.get(
  "/checkIns",
  ensureUserAuthenticated,
  ensureAdmin,
  listCheckInsController.handle
);

gymsRouter.post(
  "/checkIn/:checkInId",
  ensureUserAuthenticated,
  ensureAdmin,
  approveCheckInController.handle
);

export default gymsRouter;
