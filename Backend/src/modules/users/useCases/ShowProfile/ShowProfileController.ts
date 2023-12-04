import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowProfileUseCase } from "@modules/users/useCases/ShowProfile/ShowProfileUseCase";

export class ShowProfileController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showProfile = container.resolve(ShowProfileUseCase);

    const user = await showProfile.execute({ userId });

    return response.json(user);
  }
}
