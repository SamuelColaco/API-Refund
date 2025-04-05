
import { Router } from "express"
import { UserController } from "../Controllers/UserController"
import { Authenticated } from "../middleware/Authenticated"
import { verifyUserAuthorization } from "../middleware/VerifyUserAuthorization"

const userRoutes = Router()
const userController = new UserController()

userRoutes.get("/users", Authenticated, verifyUserAuthorization(["manager"]), userController.index)
userRoutes.post("/users", userController.create)
userRoutes.put("/users/:id", Authenticated, verifyUserAuthorization(["employee", "manager"]), userController.update)
userRoutes.delete("/users/:id",  Authenticated, verifyUserAuthorization(["manager"]), userController.deleteUser)

export { userRoutes }
