
import { Router } from "express"
import { UploadController } from "../Controllers/UploadController"

const uploadRoutes = Router()
const uploadController = new UploadController()

uploadRoutes.post("/uploads", uploadController.create)

export { uploadRoutes }