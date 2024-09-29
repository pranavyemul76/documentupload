const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set upload destination
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Name the file uniquely
  },
});
const upload = multer({ storage: storage });

const { authenticateUser, verifyUser } = require("./Controller/Middleware");
const DocumentControllers = require("./Controller/Document");
const UserControllers = require("./Controller/User");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}
route.post(
  "/api/upload",
  express.static("uploads"),
  upload.single("file"),
  authenticateUser,
  DocumentControllers.UploadDocument
);
route.get("/api/userlist", authenticateUser, UserControllers.GetUsersByemail);
route.get("/api/documents", authenticateUser, DocumentControllers.GetDocuments);
route.post("/api/share", authenticateUser, DocumentControllers.ShareDocument);
route.post("/api/register", UserControllers.UserRegister);
route.post("/api/login", UserControllers.UserLogin);
route.post("/api/verify", verifyUser, UserControllers.VerifyOtp);
route.use("/api/getuploads", express.static(path.join(__dirname, "uploads")));
module.exports = route;
