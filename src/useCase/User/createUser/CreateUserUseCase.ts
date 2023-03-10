import { hash } from "bcrypt";
import { client } from "../../../prisma/client";
import { GenerateJwtTokenProvider } from "../../../provider/GenerateJwtTokenProvider";

export interface ICreateUser {
  username: string;
  password: string;
}

class CreateUserUseCase{
  async execute({ username, password }: ICreateUser){
    if(!username || !password){
      throw new Error("Username and password are required");
    }
    
    //Verify if user exists

    const userAlreadyExists = await client.user.findFirst({
      where: {
        username
      }
    })

    if(userAlreadyExists){
      throw new Error("User already exists")
    }

    //Hash Password

    const hashPassword = await hash(password, 8)

    //Create user

    const user = await client.user.create({
      data: {
        username,
        password: hashPassword
      }
    })

    //Return new jwt token

    const generateJwtTokenProvider = new GenerateJwtTokenProvider();
    const token = await generateJwtTokenProvider.execute(user.id)

    return { token }
  }
}

export { CreateUserUseCase }