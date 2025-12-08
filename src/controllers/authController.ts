import { Request, Response } from "express"
import User from "../model/UserModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

process.loadEnvFile()
const JWT_SECRET = process.env.SECRET_KEY

class AuthController {
  static register = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Datos invalidos" })
      }

      const user = await User.findOne({ email })

      if (user) {
        return res.status(400).json({ success: false, message: "El usuario ya existe en la base de datos" })
      }

      const hash = await bcrypt.hash(password, 10)
      const newUser = new User({ email, password: hash })

      await newUser.save()
      return res.status(201).json({ success: true, message: "Usuario registrado con exito" })

    } catch (e) {
      const error = e as Error
      console.error("❌ Error al registrar usuario", error.message)
      return res.status(500).json({ success: false, message: "Error al registrar usuario", error: error.message })
    }
  }

  static login = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { email, password } = req.body


      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Datos invalidos" })
      }

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(401).json({ success: false, message: "No se encontro el usuario en la base de datos" })
      }

      const isValid = await bcrypt.compare(password, user.password)

      if (!isValid) {
        return res.status(401).json({ success: false, message: "No autorizado" })
      }
      if (!JWT_SECRET) {
        return res.status(400).json({ success: false, message: "Variables de entorno incompletas" })
      }

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" })

      return res.status(200).json({ success: true, message: "Usuario logueado con exito", token })

    } catch (e) {
      const error = e as Error
      console.error("❌ Error al iniciar sesion", error.message)
      return res.status(500).json({ success: false, message: "Error al iniciar sesion", error: error.message })
    }

  }
}

export default AuthController