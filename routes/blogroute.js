import express from "express";
import {
  createBlogController,
  deleteBlogController,
  getAllBlogController,
  getBlogById,
  getuserblogs,
  updateBlogController,
} from "../controllers/blogcontroller.js";

const blogrouter = express.Router();
blogrouter.get("/all-blog", getAllBlogController);
blogrouter.post("/create-blog", createBlogController);
blogrouter.put("/update-blog/:id", updateBlogController);

blogrouter.get("/get-blog/:id", getBlogById);

blogrouter.delete("/delete-blog/:id", deleteBlogController);

blogrouter.get("/user-blog/:id", getuserblogs);

export default blogrouter;
