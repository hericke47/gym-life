import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCheckInUseCase } from "./CreateCheckInUseCase";

export class CreateCheckInController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { gymId, latitude, longitude } = request.body;

    const userId = request.user.id;

    const createCheckIn = container.resolve(CreateCheckInUseCase);

    const checkIn = await createCheckIn.execute({
      gymId,
      userId,
      latitude,
      longitude,
    });

    return response.status(201).json(checkIn);
  }
}
