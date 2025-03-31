
import { Router } from "express"
import { UserController } from "../Controllers/UserController"

const userRoutes = Router()
const userController = new UserController()

userRoutes.get("/users", userController.index)
userRoutes.post("/users", userController.create)
userRoutes.put("/users/:id", userController.update)
userRoutes.delete("/users:/id", userController.deleteUser)

export { userRoutes }
