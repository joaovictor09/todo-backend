import { client } from "../../../prisma/client";
import { VerifyJwtTokenProvider } from "../../../provider/VerifyJwtToken";

interface IRequest{
  token: string;
  todoId: string;
}

class ChangeCompletedUseCase {
  async execute({ todoId, token }: IRequest){

    const verifyJwtTokenProvider = new VerifyJwtTokenProvider();
    const payload = await verifyJwtTokenProvider.execute(token);
    const userId = <string>payload.sub

    const todoIsValid = await client.todo.findFirstOrThrow({
      where: {
        id: todoId,
        AND: {
          userId
        }
      }, 
    })

    if (!todoIsValid){
      throw new Error("This todo doesnt exist");
    }

    const changeTodo = await client.todo.update({
      where: {
        id: todoId,
      },
      data: {
        completed: !todoIsValid.completed,
      }
    })

    return changeTodo;
  }
}

export { ChangeCompletedUseCase }