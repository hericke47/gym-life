import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateGymUseCase } from "./CreateGymUseCase";

export class CreateGymController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, phone, latitude, longitude } = request.body;

    const createGym = container.resolve(CreateGymUseCase);

    const gym = await createGym.execute({
      name,
      description,
      phone,
      latitude,
      longitude,
    });

    return response.status(201).json(gym);
  }
}
