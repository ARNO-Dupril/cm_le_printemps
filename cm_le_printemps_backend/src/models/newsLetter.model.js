import { Schema, model } from "mongoose";

const newsLetterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    },
    // userId: {
    //   type:  ObjectId, 
    //   ref: "users",
    // },
  },
  { timestamps: true }
);

export const NewsLetter = model("newsLetters", newsLetterSchema);
// export default NewsLetter;
