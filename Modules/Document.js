const mongoose = require("mongoose");
const Shema = mongoose.Schema;
const Usershema = new Shema(
  {
    id: mongoose.Types.ObjectId,
    name: String,
    type: String,
    size: Number,
    path: String,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "documentuser" },
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "documentuser" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("document", Usershema);
