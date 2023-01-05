import { client } from "../../../prisma/client";

interface ICreateTodo{
  name: string;
  userId: string;
}

class CreateTodoUserCase{
  async execute({ name, userId }: ICreateTodo){
    const todo = await client.todo.create({
      data: {
        title: name,
        userId: userId
      }
    })

    return todo;
  }
}

export { CreateTodoUserCase }