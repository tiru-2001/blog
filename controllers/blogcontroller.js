//get all blog
import mongoose from "mongoose";
import blogmodel from "../models/blogs.js";
import userm from "../models/User.js";
export const getAllBlogController = async (req, res) => {
  try {
    const getallBlog = await blogmodel.find().populate("user");
    return res.status(200).send({
      success: true,
      message: "sent all blog to client",
      getallBlog,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "something went wrong allblogcontroller",
      e,
    });
  }
};

//create blog
export const createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "please provide complete blog detail",
      });
    }

    const existingUser = await userm.findById(user);

    if (!existingUser) {
      return res.status(400).send({
        success: false,
        message: "user not exist in user collection",
      });
    }

    const blogresult = await blogmodel({
      title,
      description,
      image,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await blogresult.save({ session });
    existingUser.blogs.push(blogresult);
    await existingUser.save({ session });

    await session.commitTransaction();

    return res.status(200).send({
      message: "blog created",
      success: true,
      blogresult,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "something went wrong createblogcontroller",
      e,
    });
  }
};
//update blog
export const updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blogupdate = await blogmodel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      message: "updated blog",
      success: true,
      blogupdate,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "something went wrong updateblogcontroller",
      e,
    });
  }
};
//get blog by id
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const getindividualBlog = await blogmodel.findById(id);
    if (!getindividualBlog) {
      res.status(400).send({
        message: "cant find  blog",
      });
    }
    return res.status(200).send({
      message: "found blog",
      success: true,
      getindividualBlog,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "something went wrong getblogcontroller",
      e,
    });
  }
};
//delete blog
export const deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteblog = await blogmodel.findOneAndDelete(id).populate("user");
    console.log(deleteblog);
    await deleteblog.user.blogs.pull(deleteblog);
    await deleteblog.user.save();
    return res.status(200).send({
      message: "blog delted",
      success: true,
      deleteblog,
    });
  } catch (e) {
    return res.status(500).send({
      message: "error in deletblogcontroller",
      success: false,
    });
  }
};

export const getuserblogs = async (req, res) => {
  const userBlogs = await userm.findById(req.params.id).populate("blogs");

  if (userBlogs) {
    return res.status(200).send({
      message: "we send the blogs",
      success: true,
      userBlogs,
    });
  } else {
    return res.status(400).send({
      message: "there is no user with perticular id",
      success: false,
    });
  }
};
