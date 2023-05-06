import express from "express";
import cors from "cors";
import connect from "./config/databaconnect.js";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import blogrouter from "./routes/blogroute.js";
import router from "./routes/userroutes.js";
// import path from "path";
dotenv.config();
connect();
const port = process.env.PORT || 7000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", router);
app.use("/api/v1", blogrouter);
// app.use(express.static(path.join(__dirname, "./blog/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./blog/build/index.html"));
// });
app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(port, () => {
  console.log("listening".bgMagenta);
});
