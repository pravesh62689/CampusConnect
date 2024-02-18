const mongooose = require("mongoose");

const postSchema = new mongooose.Schema({
  userId: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  caption: {
    type: String,
  },
  location: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  like: Array,
  comment: [
    {
      id: {
        type: String,
        require: true,
      },
      userName: {
        type: String,
        require: true,
      },
      message: {
        type: String,
        require: true,
      },
    },
  ],
});

const Post = mongooose.model("posts", postSchema);
module.exports = Post;
