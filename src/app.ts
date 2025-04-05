
import "express-async-errors"
import express from "express"
import cors from "cors"
import { errorHandling } from "./middleware/ErrorHandling"
import { userRoutes } from "./routes/userRoutes"
import { sessionRoutes } from "./routes/sessionRoutes"
import { refundRoutes } from "./routes/refundRoutes"
import { uploadRoutes } from "./routes/uploadRoutes"
import upload from "./config/upload"

export const app = express()

app.use(cors())
app.use(express.json())

app.use("/uploads", express.static(upload.UPLOADS_FOLDER))

app.use(userRoutes)
app.use(sessionRoutes)
app.use(refundRoutes)
app.use(uploadRoutes)

app.use(errorHandling)