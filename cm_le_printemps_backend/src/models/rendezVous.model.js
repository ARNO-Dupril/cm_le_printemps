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
        'moins de 6ans',
        'adolescent',
        'adulte',
        '45ans et plus',
      ],
    },
    poids: {
        type: String,
        required: true,
        default: '50 - 65kg',
        enum: [
          'moins de 50kg',
          '50 - 80kg',
          'plus de 80kg',
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
