import { Request, Response } from "express"
import createTemplate from "../templates/emailTemplate"
import { Resend } from "resend"

const resendApiKey = process.env.RESEND_API_KEY
const emailUser = process.env.EMAIL_USER

if (!resendApiKey) {
  throw new Error("Falta RESEND_API_KEY en las variables de entorno")
}

if (!emailUser) {
  throw new Error("Falta EMAIL_USER en las variables de entorno")
}

const resend = new Resend(resendApiKey)


const emailService = async (req: Request, res: Response) => {
  const { subject, email: emailUserFromForm, message } = req.body

  if (!subject || !emailUserFromForm || !message) {
    return res.status(400).json({ success: false, message: "Data invalida" })
  }

  try {
    const info = await resend.emails.send({
      from: "onboarding@resend.dev",
      replyTo: emailUserFromForm,
      to: process.env.EMAIL_USER as string,
      subject,
      html: createTemplate(emailUserFromForm, message)
    })

    res.json({ success: true, message: "Correo fue enviado exitosamente", info })

  } catch (e) {
    const error = e as Error
    console.error("ERROR /email/send:", error)
    res.status(500).json({ success: false, error: error.message })
  }
}

export default emailService