import { NextFunction, Request, Response } from "express";
import IUserTokenPayload from "../interfaces/IUserTokenPayload";
import { verify } from "jsonwebtoken";

process.loadEnvFile()

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const SECRET_KEY = process.env.SECRET_KEY
  const header = req.headers.authorization

  if (!SECRET_KEY) {
    return res.status(400).json({ success: false, message: "Variables de entorno incompletas" })
  }
  if (!header) {
    return res.status(400).json({ success: false, message: "El token es requerido" })
  }


  const token = header.split(" ")[1]

  if (!token) {
    return res.status(400).json({ success: false, message: "El token es requerido" })
  }

  try {
    const payload = verify(token, SECRET_KEY)

    req.user = payload as IUserTokenPayload
    next()
  } catch (e) {
    const error = e as Error
    console.error("❌ Error en autenticacion", error.message)
    return res.status(500).json({ success: false, message: "Error en la autenticacion", error: error.message })
  }
}

export default authMiddleware