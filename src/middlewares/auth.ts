import { NextFunction, Request, Response } from "express";

export async function authMiddlewares(req:Request, res:Response, next:NextFunction) {
  let token = req.headers.authorization
  if(!token){
    res.status(401).send('Unauthorized')
    return
  }
  token = token.split(' ')[1]

  
}