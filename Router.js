const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");
const storage = multer.memoryStorage(); // Store file in memory as a buffer
const upload = multer({ storage: storage });

const { authenticateUser, verifyUser } = require("./Controller/Middleware");
const DocumentControllers = require("./Controller/Document");
const UserControllers = require("./Controller/User");
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
