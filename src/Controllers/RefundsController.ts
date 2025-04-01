
import { Request, Response } from "express"
import { prisma } from "../database/prisma"
import { Category } from "@prisma/client"
import z from "zod"

export class RefundsControllers{

    async index(req: Request, res: Response){

        const refunds = await prisma.refunds.findMany()

        res.status(200).json({ "message": refunds.length > 0 ? refunds : "Não tem reembolsos"})
    }

    async create(req: Request, res: Response){

        const bodySchema = z.object({
            name: z.string().trim().min(2, { message: "informe o nome do reembolso"}),
            amout: z.number().positive({message: "Valor tem que ser positivo"}),
            category: z.enum([Category.accommodation, Category.food, Category.others, Category.services, Category.transport]),
            filename: z.string().min(20)
        })

        const { name, amout, category, filename} = bodySchema.parse(req.body)

    }
}