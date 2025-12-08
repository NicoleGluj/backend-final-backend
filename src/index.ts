import express, { Request, Response } from "express"
import cors from "cors"
import { connectDB } from "./config/mongodb"
import productRouter from "./routes/productRouter"
import logger from "./config/logger"
import authRouter from "./routes/authRouter"
import IUserTokenPayload from "./interfaces/IUserTokenPayload"
import path from "node:path"
import fs from "node:fs"
import morgan from "morgan"
import limiter from "./middleware/rateLimitMiddlware"
import emailService from "./services/emailServices"

process.loadEnvFile()

const { PORT, URI_DB } = process.env

if (!PORT || !URI_DB) {
  console.error("❌ Error: Variables de entorno faltantes")
  process.exit(1)
}

declare global {
  namespace Express {
    interface Request {
      user?: IUserTokenPayload
    }
  }
}

const app = express()
app.use(cors())
app.use(express.json())
app.use(logger)
app.use(limiter)

const uploadsPath = path.join(__dirname, "../uploads")
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true })
}

app.use("/uploads", express.static(uploadsPath))

app.use(morgan("dev"))

app.get("/", (__: Request, res: Response) => {
  res.json({ status: true })
})

app.use("/products", productRouter)
app.use("/auth", authRouter)
app.post("/email/send", emailService)

app.use((__, res) => {
  res.status(404).json({ success: false, error: "El recurso no se encuentra" })
})

app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha en el puerto ${PORT}`)
  connectDB()
})
