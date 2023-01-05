import { Request, Response } from "express";
import { verify } from "jsonwebtoken"
 
class CreateTodoController{
  async handle(request: Request, response: Response){
    const authToken = await request.headers.authorization
    const [, token] = authToken.split(" ")

    if (!authToken){
      return response.status(401).json({
        "message": "Token is missing"
      })
    }
    
    console.log("teste")
    try {
      const decodedToken = verify(token, "77189d47-bc7e-4fbb-9bca-9b2ff4940155", {complete: true});
      console.log(decodedToken)
      return response.json(decodedToken)
      
    } catch (error) {
      return response.status(400).json({"Message": "Not decoded"})
    }



  }
}

export { CreateTodoController }