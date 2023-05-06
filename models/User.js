import mongoose from "mongoose";

const user = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "blogs",
      },
    ],
  },
  { timestamps: true }
);

const userm = mongoose.model("User", user);
export default userm;
