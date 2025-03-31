
import { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError";
import { ZodError }  from "zod"


export function ErrorHandling(err: any, req:Request, res: Response, _: NextFunction){

    if(err instanceof AppError){
        return res.status(err.statusCode).json({ message: err.message})
    }

    if(err instanceof ZodError){
        return res.status(400).json({ message: err.format()})
    }

    res.status(500).json({ message: "Erro interno do servidor"})
}