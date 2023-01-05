import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
  const authToken = request.headers.authorization

  //Verifica se token existe

  if (!authToken){
    return response.status(401).json({
      "message": "Token in missing"
    })
  }

  //Desestruta Bearer Token

  const [, token] = authToken.split(' ');
  

  if (!token){
    return response.status(401).json({
      "message": "Token is an invalid format"
    })
  }

  try {
    verify(token, "77189d47-bc7e-4fbb-9bca-9b2ff4940155");
    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Token is invalid"
    })
  }

}