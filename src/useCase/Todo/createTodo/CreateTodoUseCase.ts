import { client } from "../../../prisma/client";
import { VerifyJwtTokenProvider } from "../../../provider/VerifyJwtToken";

interface ICreateTodo{
  title: string;
  token: string;
}

class CreateTodoUserCase{
  async execute({ title, token }: ICreateTodo){

    const verifyJwtTokenProvider = new VerifyJwtTokenProvider();
    const payload = await verifyJwtTokenProvider.execute(token);
    
    const userId = <string>payload.sub

    const todo = await client.todo.create({
      data: {
        title,
        userId
      }
    })

    return todo;
  }
}

export { CreateTodoUserCase }