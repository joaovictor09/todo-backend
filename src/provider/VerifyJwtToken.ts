import { verify } from 'jsonwebtoken';

class VerifyJwtTokenProvider{
  async execute(token: string){
    const { payload } = verify(token, "77189d47-bc7e-4fbb-9bca-9b2ff4940155", { complete: true });
    return payload
  }
}

export { VerifyJwtTokenProvider }