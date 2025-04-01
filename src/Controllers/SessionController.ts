
import { Request, Response } from "express"
import z from "zod"
import { prisma } from "../database/prisma"
import { AppError } from "../utils/AppError"
import { compare } from "bcrypt"
import { authConfig } from "../config/auth"
import { sign } from "jsonwebtoken"

export class SessionController{

    async create(req: Request, res: Response){

        const bodySchema = z.object({
            email: z.string().trim().email({message: "Email inválido"}),
            password: z.string()
        })

        const { email, password } = bodySchema.parse(req.body)

        const userExist = await prisma.user.findFirst({ where: { email }})

        if(!userExist){
            throw new AppError("Usuário não cadastrado", 404)
        }

        if(!(await compare(userExist.password, password))){
            throw new AppError("Email e/ou senha errados", 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({ role: userExist.role ?? "employee"}, secret, {
            expiresIn,
            subject: userExist.id
        })

        res.status(201).json({ "token": token })

    }
}