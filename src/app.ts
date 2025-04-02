
import "express-async-errors"
import express from "express"
import cors from "cors"
import { errorHandling } from "./middleware/ErrorHandling"
import { userRoutes } from "./routes/userRoutes"
import { sessionRoutes } from "./routes/sessionRoutes"
import { refundRoutes } from "./routes/refundRoutes"

export const app = express()

app.use(cors())
app.use(express.json())

app.use(userRoutes)
app.use(sessionRoutes)
app.use(refundRoutes)

app.use(errorHandling)