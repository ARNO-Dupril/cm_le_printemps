import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      maxlength: 25,
    },
    theme: {
      type: String,
      required: true,
      maxlength: 25,
    },
    contenu: {
      type: String,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      index: { unique: false },
      match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("contacts", contactSchema);
// module.exports = Contact;
