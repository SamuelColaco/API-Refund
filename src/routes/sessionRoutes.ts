
import { Router } from "express"
import { SessionController } from "../Controllers/SessionController"

const sessionRoutes = Router()

const sessionController = new SessionController()

sessionRoutes.post("/session", sessionController.create)

export { sessionRoutes }