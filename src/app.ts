
import "express-async-errors"
import express from "express"
import cors from "cors"
import { errorHandling } from "./middleware/ErrorHandling"
import { userRoutes } from "./routes/userRoutes"

export const app = express()

app.use(cors())
app.use(express.json())

app.use(userRoutes)

app.use(errorHandling)