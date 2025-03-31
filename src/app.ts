
import express from "express"
import cors from "cors"
import { errorHandling } from "./middleware/ErrorHandling"

export const app = express()

app.use(cors())
app.use(express.json())

app.use(errorHandling)