import mongoose from "mongoose";
import colors from "colors";

const connect = async () => {
  try {
    let connectResult = await mongoose.connect(process.env.DATABASE_URL);
    console.log("connected".bgGreen);
  } catch (e) {
    console.log(e);
    console.log("error in connecting to database".bgRed);
  }
};

export default connect;
