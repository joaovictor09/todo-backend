import { Request, Response } from "express";
import { DeleteTodoUseCase } from "./DeleteTodoUseCase";
import { EnsureAuthTokenFormat } from "../../../provider/EnsureAuthTokenFormat";

class DeleteTodoController{
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

    const deleteTodoUseCase = new DeleteTodoUseCase()
    const deletedTodo = await deleteTodoUseCase.execute({ token: tokenIsValid,  todoId})

    return response.json(deletedTodo)

  }
}

export { DeleteTodoController }