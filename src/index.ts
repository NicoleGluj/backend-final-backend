import express from "express"
import cors from "cors"
import { connectDB } from "./config/mongodb"
import productRouter from "./routes/productRouter"
import logger from "./config/logger"

process.loadEnvFile()

const { PORT, URI_DB } = process.env

if (!PORT || !URI_DB) {
  console.error("❌ Error: Variables de entorno faltantes")
}

declare global {
  namespace Express {
    interface Request {
      // user?: IUserTokenPayload
    }
  }
}

const app = express()
app.use(cors())
app.use(express.json())
app.use(logger)

app.use("/products", productRouter)

app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha en el puerto ${PORT}`)
  connectDB()
})
