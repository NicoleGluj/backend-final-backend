import z from "zod";

const productSchemaValidator = z.object({
  name: z.string().min(4),
  description: z.string().min(10),
  stock: z.number().positive(),
  price: z.number().positive(),
  category: z.string(),
  image: z.string().default("No contiene imagen")
})

export const createProductSchema = productSchemaValidator
export const updateProductSchema = productSchemaValidator.partial()