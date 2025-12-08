import mongoose from "mongoose"

export const connectDB = async () => {
  const uri = process.env.URI_DB

  if (!uri) {
    console.log("❌Error: No se encontro URI_DB en las variables de entorno")
    process.exit(1)
  }

  try {
    console.log("🧩 Intentando conectar con MongoDB...")
    await mongoose.connect(uri)
    console.log("✅  Conectado exitosamente con MongoDB")
  } catch (error: any) {
    console.error("❌Error al conectarse con MongoDB")
    console.error(error.message)
    process.exit(1)
  }
}

