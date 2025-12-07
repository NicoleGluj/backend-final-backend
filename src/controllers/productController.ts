import { Request, Response } from "express"
import Product from "../model/ProductModel"
import { Types } from "mongoose"
import { createProductSchema, updateProductSchema } from "../validators/productValidator"

class ProductController {
  static getAllProducts = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { name, stock, category, minPrice, maxPrice } = req.query

      const filter: any = {}

      if (name) filter.name = new RegExp(String(name), "i")
      if (stock) filter.stock = Number(stock)
      if (category) filter.category = new RegExp(String(category), "i")
      if (minPrice || maxPrice) {
        filter.price = {}
        if (minPrice) filter.price.$gte = Number(minPrice)
        if (maxPrice) filter.price.$lte = Number(maxPrice)
      }

      const products = await Product.find(filter)
      res.status(200).json({ success: true, data: products })

    } catch (e) {
      const error = e as Error
      console.error("❌ Error al obtener todos los productos", error.message)
      return res.status(500).json({ success: false, message: "Error al cargar los productos", error: error.message })
    }
  }

  static getProduct = async (req: Request, res: Response): Promise<void | Response> => {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ success: false, message: "ID requerido" })
    }

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID invalido" })
    }

    try {
      const product = await Product.findById(id)

      if (!product) {
        return res.status(404).json({ success: false, message: "Producto no encontrado" })
      }

      return res.status(200).json({ success: true, data: product })
    } catch (e) {
      const error = e as Error
      console.error("❌ Error al obtener producto", error.message)
      return res.status(500).json({ success: false, message: "Error al encontrar producto", error: error.message })
    }
  }

  static addProduct = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { name, description, stock, price, category, image } = req.body
      // const { file } = req

      const dataToValidate = {
        name,
        description,
        stock: +stock,
        price: +price,
        category,
        // image: file?.path
      }

      const validator = createProductSchema.safeParse(dataToValidate)

      if (!validator.success) {
        return res.status(400).json({ success: false, message: "Datos invalidos al agregar producto", error: validator.error.flatten().fieldErrors })
      }

      const newProduct = new Product(validator.data)
      await newProduct.save()

      return res.status(201).json({ success: true, data: newProduct })

    } catch (e) {
      const error = e as Error
      console.error("❌ Error al agregar un nuevo producto", error.message)
      res.status(500).json({ success: false, message: "Error al agregar producto", error: error.message })
    }
  }

  static updateProduct = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { id } = req.params
      const { body } = req

      if (!id) {
        return res.status(400).json({ success: false, message: "ID requerido" })
      }

      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "ID invalido" })
      }

      const validator = updateProductSchema.safeParse(body)

      if (!validator.success) {
        return res.status(400).json({ success: false, message: "Datos invalidos al actualizar producto", error: validator.error.flatten().fieldErrors })
      }

      const updateProduct = await Product.findByIdAndUpdate(id, validator.data, { new: true })

      if (!updateProduct) {
        return res.status(404).json({ success: false, message: "Producto no encontrado" })
      }

      return res.status(200).json({ success: true, data: updateProduct })

    } catch (e) {
      const error = e as Error
      console.error("❌ Error al actualizar el producto", error.message)
      res.status(500).json({ success: false, message: "Error al actualizar producto", error: error.message })
    }
  }

  static deleteProduct = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({ success: false, message: "ID requerido" })
      }

      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "ID invalido" })
      }

      const deleteProduct = await Product.findByIdAndDelete(id)

      if (!deleteProduct) {
        return res.status(404).json({ success: false, message: "Producto no encontrado" })
      }

      return res.status(200).json({ success: true, data: deleteProduct })

    } catch (e) {
      const error = e as Error
      console.error("❌ Error al actualizar el producto", error.message)
      res.status(500).json({ success: false, message: "Error al eliminar producto", error: error.message })
    }
  }


}

export default ProductController