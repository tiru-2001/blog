import mongoose from "mongoose";

const blogscema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const blogmodel = mongoose.model("blogs", blogscema);
export default blogmodel;
