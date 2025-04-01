
import { Request, Response } from "express"
import { prisma } from "../database/prisma"
import z from "zod"
import { AppError } from "../utils/AppError"
import { UserRole } from "@prisma/client"
import { hash } from "bcrypt"

interface RequestBodyUpdate{
    name: string
    email: string
    password: string
}

export class UserController{

    async index(req: Request, res: Response){

        const users = await prisma.user.findMany()

        res.status(200).json({ message: users.length > 0 ? users : "Não tem usuários cadastrados"})
    }

    async create(req: Request, res: Response){

        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email({message: "Email inválido"}).toLowerCase(),
            password: z.string().min(6, {message: "Senha inválida"}).trim(),
            role: z.enum([UserRole.employee, UserRole.manager]).default(UserRole.employee)
        })

        const { name, email, password, role } = bodySchema.parse(req.body)

        const userExist = await prisma.user.findFirst({ where: { email }})

        if(userExist){
            throw new AppError("Usuário já cadastrado")
        }

        const passwordHash = await hash(password, 8)

        await prisma.user.create({ data: { name, email, password: passwordHash, role }})

        res.status(201).json({ message: "Usuário cadastrado"})

    }

    async update(req: Request, res: Response){

        const paramSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramSchema.parse(req.params)

        const { ...all } = req.body as RequestBodyUpdate

        const userExist = await prisma.user.findFirst({ where: { id }})

        if(!userExist){
            throw new AppError("Usuário não é cadastrado")
        }

        await prisma.user.update({ where: { id }, data: { ...all }})

        res.status(200).json({ message: "Usuário atualizado com sucesso" })
    }

    async deleteUser(req: Request, res: Response){

        const paramSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramSchema.parse(req.params)

        const userExist = await prisma.user.findFirst({ where: { id }})

        if(!userExist){
            throw new AppError("Usuário não é cadastrado")
        }

        await prisma.user.delete({ where: { id }})

        res.status(200).json( { message: "Usuário deletado"} )
    }
}