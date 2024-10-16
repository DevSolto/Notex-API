import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.path === '/login') return next();
    // Recupera o token do cabeçalho Authorization
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    // Remove o prefixo 'Bearer' do token
    token = token.split(" ")[1];

    // Verifica e decodifica o token usando a chave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Adiciona o usuário decodificado ao objeto de solicitação
    req.user = decoded.user;

    next(); // Continua para o próximo middleware ou rota
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).send("Unauthorized: Invalid or expired token");
  }
}
