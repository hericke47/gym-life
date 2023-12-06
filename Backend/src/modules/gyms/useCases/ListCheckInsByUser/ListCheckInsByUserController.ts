import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCheckInsByUserUseCase } from "./ListCheckInsByUserUseCase";

export class ListCheckInsByUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { skip, take } = request.query;

    const userId = request.user.id;

    const checkInsUseCase = container.resolve(ListCheckInsByUserUseCase);

    const checkIns = await checkInsUseCase.execute({
      userId,
      skip: Number(skip),
      take: Number(take),
    });

    return response.status(200).json(checkIns);
  }
}
