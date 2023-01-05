import { compare } from "bcrypt";
import { client } from "../../../prisma/client";
import { GenerateJwtTokenProvider } from "../../../provider/GenerateJwtTokenProvider";

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

    //Verifica se a senha está correta

    const passwordMatch = await compare(password, userAlreadyExists.password)

    if (!passwordMatch){
      throw new Error('Username or Password are incorrect');
    }

    //Gera JWT Token

    const generateJwtTokenProvider = new GenerateJwtTokenProvider();
    const token = await generateJwtTokenProvider.execute(userAlreadyExists.id)

    return { token }
  }
}

export { AuthenticateUserUseCase }