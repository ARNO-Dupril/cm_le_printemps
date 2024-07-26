import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    username: {
      type: String,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    },
    password: {
      type: String,
      required: true,
    },
    userRole: {
      type: Number,
      default: 0,
      enum: [
        -1,
        0,
        1
      ],
      required: true,
    },
    telephone: {
      type: Number,
      length: 9,
      trim: true,
      index: { unique: true },
      match: /^([0-9])+$/,
    },
    profil: {
      type: String,
      default: "user.png",
    },
    verified: {
      type: String,
      default: false,
    },
    secretKey: {
      type: String,
      default: null,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export const Users = mongoose.model("users", userSchema);
// export default User;