
import { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError"
import { verify } from "jsonwebtoken"
import { authConfig } from "../config/auth"

export function Authenticated(req: Request, res: Response, next: NextFunction){

    interface TokenPayload{
        role: string,
        sub: string
    }

    const autHeader = req.headers.authorization

    if(!autHeader){
        throw new AppError("Você não está autenticado", 401)
    }

    const autHeaderToken = autHeader.slice(7)

    const { sub: userId, role } = verify(autHeaderToken, authConfig.jwt.secret) as TokenPayload

    req.user = {
        id: userId,
        role
    }

    return next()
}