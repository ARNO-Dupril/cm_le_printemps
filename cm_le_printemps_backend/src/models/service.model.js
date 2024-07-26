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
    descriptionS: {
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
