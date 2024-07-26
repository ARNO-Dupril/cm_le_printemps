import { Schema , model } from "mongoose";
const { ObjectId } = Schema.Types;

const commentaireSchema = new Schema(
  {
    sujet: {
      type: String,
      required: true,
      maxlength: 25,
    },
    contenu: {
      type: String,
      required: true,
      maxlength: 32,
    },
    userId: {
      type:  ObjectId, 
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

export const Commentaire = model("commentaires", commentaireSchema);
// export default Commentaire;
