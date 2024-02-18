const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
    time: {
      type: Date,
      default: Date.now,
    },
    userName: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("groupchat", groupSchema);
module.exports = Group;
