import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, default: undefined, ref: "category" },
  },
  {
    versionKey: false,
    id: false,
    toJSON: {
      virtuals: true,
    },
  }
)

CategorySchema.virtual("subcategories", {
  ref: "category",
  localField: "_id",
  foreignField: "parent",
})

export default mongoose.model("category", CategorySchema)
