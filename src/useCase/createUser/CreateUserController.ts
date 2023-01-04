import { Request, Response } from "express";
import { CreateUserUseCase, ICreateUser } from "./CreateUserUseCase";

class CreateUserController{
  async handle(request: Request, response: Response){
    const { username, password } = <ICreateUser>request.body;

    const createUserUseCase = new CreateUserUseCase();
    const user = await createUserUseCase.execute({ username, password })

    response.json(user)

  }
}

export { CreateUserController }