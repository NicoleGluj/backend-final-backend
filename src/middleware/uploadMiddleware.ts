import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "productos",
      format: undefined,
      public_id: Date.now().toString()
    }
  }
})

const fileFilter: multer.Options["fileFilter"] = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true)
  } else {
    console.log(file.mimetype)
    cb(new Error("Solo se permiten imagenes"))
  }
}

const upload = multer({ storage, fileFilter })

export default upload