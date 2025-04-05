
import { Request, Response } from "express"

import upload from "../config/upload"
import  { z, ZodError } from "zod"
import { DiskStorage } from "../providers/DiskStorage"
import { runInNewContext } from "vm"
import { AppError } from "../utils/AppError"

export class UploadController{
    async create(req: Request, res: Response){
        const diskStorage = new DiskStorage()
        try {

            const fileSchema = z.object({
                filename: z.string().min(1, { message: "Arquivo necessário"}),
                mimetype: z.string().refine((type) => upload.ACCEPTED_IMAGE_TYPES.includes(type), `Arquivo inválido, apenas os formatos ${upload.ACCEPTED_IMAGE_TYPES}`),
                size: z.number().positive().refine((size) => upload.MAX_FILE_SIZE, "Arquivo de tamanho inválido, máximo 3 megas")
            }).passthrough()

            const { ...file } = fileSchema.parse(req.file)

            const filename = await diskStorage.saveFile(file.filename)

            res.status(201).json({ file: filename })
            
        } catch (error) {
            if(error instanceof ZodError){
                if(req.file){
                    await diskStorage.deleteFile(req.file.filename, "tmp")
                }

                throw new AppError(error.issues[0].message)
            }
            throw error
        }
    }
}