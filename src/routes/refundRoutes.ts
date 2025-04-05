
import { Router } from "express"
import { RefundsControllers } from "../Controllers/RefundsController"
import { Authenticated } from "../middleware/Authenticated"
import { verifyUserAuthorization } from "../middleware/VerifyUserAuthorization"

const refundRoutes = Router()

const refundControllers = new RefundsControllers()

refundRoutes.get("/refund", Authenticated, verifyUserAuthorization(["manager"]), refundControllers.index)
refundRoutes.get("/refund/:id", Authenticated, verifyUserAuthorization(["employee", "manager"]), refundControllers.indexById)
refundRoutes.post("/refund", Authenticated, verifyUserAuthorization(["employee", "manager"]), refundControllers.create)
refundRoutes.put("/refund/:id",Authenticated, verifyUserAuthorization(["manager"]),  refundControllers.update)
refundRoutes.delete("/refund/:id", Authenticated, verifyUserAuthorization(["manager"]),  refundControllers.deleteRefund)

export { refundRoutes }