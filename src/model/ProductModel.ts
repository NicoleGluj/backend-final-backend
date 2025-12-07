import { model, Model, Schema } from "mongoose";
import IProduct from "../interfaces/IProudct";

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, default: "No tiene descripcion" },
  stock: { type: Number, min: 0, default: 0, required: true },
  price: { type: Number, min: 0, default: 0, required: true },
  category: { type: String, default: "No tiene categoria" },
  image: { type: String }
}, {
  versionKey: false
})

const Product: Model<IProduct> = model("Product", productSchema)

export default Product