import { Request, Response } from "express";
import { ListTodosUseCase } from "./ListTodosUseCase";

class ListTodosController{
  async handle(request: Request, response: Response){
    const authToken = request.headers.authorization
    
    //Verifica se o Auth Token ou title existe

    if (!authToken){
      return response.status(401).json({
        "message": "Token is missing"
      })
    }

    //Verifica se está no formato Bearer

    const [bearer, token] = authToken.split(" ")

    if (!token || bearer !== "Bearer") {
      return response.status(401).json({
        "message": "Token is an invalid format"
      })
    }

    //Envia para o use case
    
    const listTodoUseCase = new ListTodosUseCase();
    const todos = await listTodoUseCase.execute({ token })
    
    response.json(todos)

  }
}

export { ListTodosController }