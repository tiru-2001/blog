import express from "express";
import {
  getalluser,
  loginController,
  registerController,
} from "../controllers/controller.js";
const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/getuser", getalluser);

export default router;
