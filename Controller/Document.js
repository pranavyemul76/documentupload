const Document = require("../Modules/Document");
const User = require("../Modules/User");
exports.GetDocuments = async (req, res, next) => {
  try {
    const userId = req.userId; // Extract from JWT token
    const documents = await Document.find({
      $or: [{ uploadedBy: userId }, { sharedWith: userId }],
    })
      .populate("uploadedBy", "name") // Populate only the name of the uploader
      .populate("sharedWith", "name");
    res.status(200).json(documents);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error While Fecthing" });
  }
};

exports.ShareDocument = async (req, res, next) => {
  const { documentId, recipientEmail } = req.body;
  try {
    const recipient = await User.findOne({ email: recipientEmail });
    if (!recipient) return res.status(404).json({ message: "User not found" });
    const updatedDocument = await Document.findByIdAndUpdate(
      documentId,
      { $addToSet: { sharedWith: recipient._id } }, // Use $addToSet to avoid duplicates
      { new: true } // Return the updated document
    ).populate("sharedWith", "name");
    res.status(200).json({
      document: updatedDocument,
      message: "Document shared successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error While Share Document", document: document });
  }
};

exports.UploadDocument = async (req, res) => {
  const { originalname, mimetype, size, filename } = req.file;
  const document = new Document({
    name: originalname,
    type: mimetype,
    size,
    uploadedBy: req.userId,
    path: `/api/getuploads/${filename}`, // Store the file path for retrieval
  });

  const response = await document.save();
  const populatedFile = await Document.findById(response._id)
    .populate("uploadedBy", "name") // Populate only the name of the uploader
    .populate("sharedWith", "name");
  res.status(200).json({ message: "upload success", document: populatedFile });
};
