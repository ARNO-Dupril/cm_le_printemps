import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const rdvSchema = new Schema(
  {
    nom: {
      type: String,
      required: true,
      maxlength: 25,
    },
    prenom: {
      type: String,
      required: true,
      maxlength: 25,
    },
    age: {
      type: String,
      required: true,
      default: 'adolescent',
      enum: [
        'bebe',
        'enfant',
        'adolescent',
        'adulte',
      ],
    },
    sexe: {
      type: String,
      required: true,
      default: 'masculin',
      enum: [
        'masculin',
        'feminin',
      ],
    },
    description: {
      type: String,
      required: false,
    },
    serviceId: {
      type:  ObjectId, 
      ref: "service",
      required: true,
    },
  },
  { timestamps: true }
);

export const Rdv = model("rendezVous", rdvSchema);
// export default Rdv;
