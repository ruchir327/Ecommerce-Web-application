import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const couponSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: "Nmae is required",
      minlength: [6, "Too short"],
      maxlength: [40, "Too long"],
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      requred: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Coupon", couponSchema);
