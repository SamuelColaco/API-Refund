
import { Router } from "express"
import { UploadController } from "../Controllers/UploadController"
import upload from "../config/upload"
import multer from "multer"
import { verifyUserAuthorization } from "../middleware/VerifyUserAuthorization"
import { Authenticated } from "../middleware/Authenticated"


const uploadMulter = multer(upload.MULTER)
const uploadRoutes = Router()
const uploadController = new UploadController()

uploadRoutes.post("/uploads", Authenticated,  verifyUserAuthorization(["employee", "manager"]), uploadMulter.single("file"),  uploadController.create)

export { uploadRoutes }