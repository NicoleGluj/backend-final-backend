import { model, Model, Schema } from "mongoose";
import IUser from "../interfaces/IUser";

const userShema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

const User: Model<IUser> = model("User", userShema)

export default User