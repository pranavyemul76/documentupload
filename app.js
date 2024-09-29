const express = require("express");
require("dotenv").config();
const port = process.env.PORT;
const host = process.env.HOST;
const cors = require("cors");
const Route = require("./Router");
const mongoose = require("mongoose");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000", // Specify the exact origin
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/", Route);
mongoose
  .connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(port, host, () => {
      console.log(`server run on ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
