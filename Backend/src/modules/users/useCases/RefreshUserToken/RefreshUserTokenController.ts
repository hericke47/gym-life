import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshUserTokenUseCase } from "./RefreshUserTokenUseCase";

class RefreshUserTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { refreshToken } = request.body;

    const refreshUserTokenUseCase = container.resolve(RefreshUserTokenUseCase);

    const refreshTokenResponse = await refreshUserTokenUseCase.execute(
      refreshToken
    );

    return response.json(refreshTokenResponse);
  }
}

export { RefreshUserTokenController };
