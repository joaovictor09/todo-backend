import { client } from "../../../prisma/client";
import { VerifyJwtTokenProvider } from "../../../provider/VerifyJwtToken"

interface IRequest {
  token: string;
}

class ListTodosUseCase{
  async execute({token}: IRequest){
    const verifyJwtToken = new VerifyJwtTokenProvider();
    const payload = await verifyJwtToken.execute(token)
    
    const userId = <string>payload.sub
    
    const todos = await client.todo.findMany({
      where: {
        userId
      }
    })

    return todos

  }
}

export { ListTodosUseCase }