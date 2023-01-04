import { compare } from "bcrypt";
import { client } from "../../prisma/client";

export interface IAuthenticateUser{
  username: string;
  password: string;
}

class AuthenticateUserUseCase{
  async execute({ username, password }:IAuthenticateUser){

    //Verifica se os campos estão preenchidos
    if(!username || !password){
      throw new Error('Username or password is empty');
    }

    //Verifica se o usuario existe
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username
      }
    })

    if(!userAlreadyExists){
      throw new Error('Username or Password are incorrect');
    }

    const passwordMatch = await compare(password, userAlreadyExists.password)

    if (!passwordMatch){
      throw new Error('Username or Password are incorrect');
    }

    return userAlreadyExists
  }
}

export { AuthenticateUserUseCase }