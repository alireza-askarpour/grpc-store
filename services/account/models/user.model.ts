import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    mobile: { type: String, required: true, unique: true },
    otp: {
      type: Object,
      enum: [{ code: String, expiresIn: Number }],
      default: { code: 0, expiresIn: 0 },
    },
    role: {
      type: String,
      required: true,
      default: "student",
      enum: ["student", "writer", "admin"],
    },
    avatar: { type: String, default: "" },
    cover: { type: String, default: "" },
    basket: { type: [mongoose.Types.ObjectId], default: [] },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

UserSchema.index({ fullname: "text", mobile: "text" })

export default mongoose.model("user", UserSchema)
