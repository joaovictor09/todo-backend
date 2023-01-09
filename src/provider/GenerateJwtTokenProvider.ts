import { sign } from "jsonwebtoken"

class GenerateJwtTokenProvider{
  async execute(userId: string){
    const token = sign({}, "77189d47-bc7e-4fbb-9bca-9b2ff4940155", {
      subject: userId,
      expiresIn: '12h' //12 Hours
    });

    return token;
  }
}

export { GenerateJwtTokenProvider }