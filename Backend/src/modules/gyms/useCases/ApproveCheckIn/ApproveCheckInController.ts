import { Request, Response } from "express";
import { container } from "tsyringe";
import { ApproveCheckInUseCase } from "./ApproveCheckInUseCase";

export class ApproveCheckInController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { checkInId } = request.params;

    const createCheckIn = container.resolve(ApproveCheckInUseCase);

    const checkIn = await createCheckIn.execute({
      checkInId,
    });

    return response.status(200).json(checkIn);
  }
}
