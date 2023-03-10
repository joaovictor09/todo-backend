import { Request, Response } from "express";

import { AuthenticateUserUseCase, IAuthenticateUser } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response){
    const { username, password } = <IAuthenticateUser>request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase();
    const user = await authenticateUserUseCase.execute({ username, password });

    return response.json(user);

  }
}

export { AuthenticateUserController }