const express = require("express");
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/Isprava-billing")
  .then(() => {
    console.log("Connected to database");
    const PORT = 8000;
    app.listen(PORT, () => {
      console.log(`Server started ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });
