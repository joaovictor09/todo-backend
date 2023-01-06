import { Request, Response } from "express";
import { CreateTodoUserCase } from "./CreateTodoUseCase";

interface IRequest{
  title: string;
}
 
class CreateTodoController{
  async handle(request: Request, response: Response){
    const authToken = request.headers.authorization
    const { title } = <IRequest>request.body
    
    //Verifica se o Auth Token ou title existe

    if (!authToken || !title){
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
    
    const createTodoUseCase = new CreateTodoUserCase();
    const todo = await createTodoUseCase.execute({ title, token })
    
    response.json(todo)
  }
}

export { CreateTodoController }