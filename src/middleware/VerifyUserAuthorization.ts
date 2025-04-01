
import { Request, Response, NextFunction} from "express"
import { AppError } from "../utils/AppError"

export function verifyUserAuthorization(roles: string[]){

    return (req: Request, res: Response, next: NextFunction) => {

        if(!req.user){
            throw new AppError("Usuário não autenticado", 401)
        }

        if(!roles.includes(req.user.role)){
            throw new AppError("Usuário não tem permissão para esta ação", 401)
        }

        return next()

    }

}