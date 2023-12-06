import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindTodayCheckInsByUserUseCase } from "./FindTodayCheckInsByUserUseCase";

export class FindTodayCheckInsByUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const checkInsUseCase = container.resolve(FindTodayCheckInsByUserUseCase);

    const checkIn = await checkInsUseCase.execute({
      userId,
    });

    return response.status(200).json(checkIn);
  }
}
