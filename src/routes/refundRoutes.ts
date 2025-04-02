
import { Router } from "express"
import { RefundsControllers } from "../Controllers/RefundsController"

const refundRoutes = Router()

const refundControllers = new RefundsControllers()

refundRoutes.get("/refund", refundControllers.index)
refundRoutes.get("/refund/:id", refundControllers.indexById)
refundRoutes.post("/refund", refundControllers.create)
refundRoutes.put("/refund/:id", refundControllers.update)
refundRoutes.delete("/refund/:id", refundControllers.deleteRefund)

export { refundRoutes }