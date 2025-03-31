
import { Request, Response, NextFunction, ErrorRequestHandler } from "express"
import { AppError } from "../utils/AppError";
import { ZodError }  from "zod"


export const errorHandling: ErrorRequestHandler = (err, req, res, next) => {

    if(err instanceof AppError){
        res.status(err.statusCode).json({ message: err.message})
        return
    }

    if(err instanceof ZodError){
        res.status(400).json({ message: "Erro de validação", issues: err.format()})
        return
    }

    res.status(500).json({ message: "Erro interno do servidor"})
}