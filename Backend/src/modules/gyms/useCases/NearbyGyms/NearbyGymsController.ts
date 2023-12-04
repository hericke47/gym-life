import { Request, Response } from "express";
import { container } from "tsyringe";
import { NearbyGymsUseCase } from "./NearbyGymsUseCase";

export class NearbyGymsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { latitude, longitude } = request.query;

    const nearbyGyms = container.resolve(NearbyGymsUseCase);

    const gyms = await nearbyGyms.execute({
      latitude: Number(latitude),
      longitude: Number(longitude),
    });

    return response.status(200).json(gyms);
  }
}
