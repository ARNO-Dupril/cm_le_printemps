const { ObjectId } = Schema.Types;
import { Schema, model } from "mongoose";

const demandeSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    statut: {
      type: String,
      required: true,
      default: 'attente',
      enum: [
        'attente',
        'confirmé',
        'annulé',
        'reporté',
      ]
    },
    rdvId: {
      type: ObjectId,
      ref: "rendezVous",
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

export const Demandes = model("demande", demandeSchema);
// export default Services;
