import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId, ref: "category", required: true },
    price: { type: Number, default: 0 },
    supplier: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    count: { type: Number, default: 0 },
  },
  {
    versionKey: false,
  }
)

export default mongoose.model("product", ProductSchema)
