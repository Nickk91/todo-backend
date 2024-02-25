import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
console.log(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
    // Your server setup code here
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/api/v1/todos", router);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`on port ${PORT} !!!`);
});
