import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCheckInsUseCase } from "./ListCheckInsUseCase";

export class ListCheckInsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { skip, take } = request.query;

    const listCheckInsUseCase = container.resolve(ListCheckInsUseCase);

    const checkIns = await listCheckInsUseCase.execute({
      skip: Number(skip),
      take: Number(take),
    });

    return response.status(200).json(checkIns);
  }
}
