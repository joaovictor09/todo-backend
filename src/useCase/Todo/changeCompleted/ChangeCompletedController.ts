import { Request, Response } from "express";
import { EnsureAuthTokenFormat } from "../../../provider/EnsureAuthTokenFormat";
import { ChangeCompletedUseCase } from "./ChangeCompletedUseCase";

class ChangeCompletedController {
  async handle(request: Request, response: Response){
    const authToken = request.headers.authorization
    const todoId = request.params.todoId

    const ensureAuthTokenFormat = new EnsureAuthTokenFormat();
    const tokenIsValid = await ensureAuthTokenFormat.execute(authToken);

    if(!tokenIsValid){
      response.status(401).json({
        "message": "Invalid token format"
      })
    }

    const changeCompletedUseCase = new ChangeCompletedUseCase()
    const changedTodo = await changeCompletedUseCase.execute({ token: tokenIsValid,  todoId})

    return response.json(changedTodo)

  }
}

export { ChangeCompletedController }