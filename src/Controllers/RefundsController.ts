
import { Request, Response } from "express"
import { prisma } from "../database/prisma"
import { Category } from "@prisma/client"
import z from "zod"
import { AppError } from "../utils/AppError"

interface RequestUpdateBody{
    name: string
    amount: number
    category: Category
    filename: string
}

export class RefundsControllers{

    async index(req: Request, res: Response){
        const refunds = await prisma.refunds.findMany()

        res.status(200).json({ "message": refunds.length > 0 ? refunds : "Não tem reembolsos"})
    }

    async indexById(req: Request, res: Response){

        const paramSchema = z.object({
            id: z.string().uuid()
        })

        const { id } =  paramSchema.parse(req.params)

        const userExist = await prisma.user.findFirst({ where: { id }})

        if(!userExist){
            throw new AppError("Usuário não encontrado", 404)
        }

        if(!req.user?.id){
            throw new AppError("Usuário não autenticado", 401)
        }

        if(req.user.id !== userExist.id){
            throw new AppError("Você não tem permissão para ver de outro usuário", 401)
        }

        const refundExist = await prisma.refunds.findMany({ where: { userId: id }})

        res.status(200).json({"refunds": refundExist.length > 0 ? refundExist : "Não tem reembolsos"})

    }

    async create(req: Request, res: Response){

        const bodySchema = z.object({
            name: z.string().trim().min(2, { message: "informe o nome do reembolso"}),
            amount: z.number().positive({message: "Valor tem que ser positivo"}),
            category: z.enum([Category.accommodation, Category.food, Category.others, Category.services, Category.transport]),
            filename: z.string().min(20)
        })

        const { name, amount, category, filename} = bodySchema.parse(req.body)

        if(!req.user?.id){
            throw new AppError("Usuário não autenticado", 401)
        }

        await prisma.refunds.create({ data: { name, amount, category, filename, userId: req.user.id }})

        res.status(201).json({ message: "Solicitação feita"})
    }

    async update(req: Request, res: Response){

        const paramSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramSchema.parse(req.params)


        const { ...all } = req.body as RequestUpdateBody

        const refundExist = await prisma.refunds.findFirst({ where: { id }})

        if(!refundExist){
            throw new AppError("Esse reembolso não existe", 404)
        }

        await prisma.refunds.update({ where: { id }, data: { ...all }})

        res.status(200).json({ message: "Update feito com sucesso"})

    }

    async deleteRefund(req: Request, res: Response){

        const paramSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramSchema.parse(req.params)

        const refundExist = await prisma.refunds.findFirst({ where: { id }})

        if(!refundExist){
            throw new AppError("Esse reembolso não existe", 404)
        }

        await prisma.refunds.delete({ where: { id }})

        res.status(200).json({ message: "Deletado com sucesso"})
    }
}