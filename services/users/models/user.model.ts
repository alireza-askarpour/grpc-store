import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, require: true },
    mobile: { type: String, required: true, unique: true },
    otp: {
      type: Object,
      enum: [{ code: Number, expiresIn: Number }],
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
    courses: { type: [mongoose.Types.ObjectId], default: [] },
    skills: { type: [mongoose.Types.ObjectId], default: [] },
    basket: {
      type: [mongoose.Types.ObjectId],
      unique: true,
      default: [],
      ref: "course",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

UserSchema.index({ fullname: "text", mobile: "text" })

export default mongoose.model("user", UserSchema)
