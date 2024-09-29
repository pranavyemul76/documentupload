const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 8080;
const host = process.env.VERCEL_URL;
const path = require("path");
const cors = require("cors");
const Route = require("./Router");
const mongoose = require("mongoose");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  origin: "*", // Specify the exact origin
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/", Route);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}
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
