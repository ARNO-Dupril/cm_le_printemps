import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const serviceSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      maxlength: 10,
      trim: true,
      index: { unique: false },
    },
    nom: {
      type: String,
      required: true,
      maxlength: 25,
      index: { unique: false },
    },
    description: {
      type: String,
      required: true,
    },
    actif: {
      type: Boolean,
      required: true,
      default: true
    },
    image: {
      type: String,
      required: true,
    },
    userId: {
      type:  ObjectId, 
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

export const Services = model("service", serviceSchema);
