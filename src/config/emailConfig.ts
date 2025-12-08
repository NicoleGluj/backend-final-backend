import nodemailer from "nodemailer";

const USER = process.env.EMAIL_USER
const PASS = process.env.EMAIL_PASS

if (!USER || !PASS) {
  throw new Error("EMAIL_USER o EMAIL_PASS no configurados")
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USER,
    pass: PASS
  }
})

export default transporter