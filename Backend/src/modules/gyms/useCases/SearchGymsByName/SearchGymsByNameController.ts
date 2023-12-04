import { Request, Response } from "express";
import { container } from "tsyringe";
import { SearchGymsByNameUseCase } from "./SearchGymsByNameUseCase";

export class SearchGymsByNameController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, skip, take } = request.query;

    const findedGyms = container.resolve(SearchGymsByNameUseCase);

    const gyms = await findedGyms.execute({
      name: String(name),
      skip: Number(skip),
      take: Number(take),
    });

    return response.status(200).json(gyms);
  }
}
