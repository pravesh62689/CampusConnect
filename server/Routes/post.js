const express = require("express");
const post = express();
const Post = require("../Model/postSchema");
const verify = require("../Middlewares/index");
const multer = require("multer");
const fs = require("fs");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Routes/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const uploads = multer({ storage: Storage });

post.get("/getPosts", async (req, res) => {
  let posts = await Post.find().sort({ time: -1 });
  posts = posts.map((e) => {
    return {
      _id: e._id,
      userId: e.userId,
      caption: e.caption,
      location: e.location,
      like: e.like,
      comment: e.comment,
      userName: e.userName,
      time: e.time,
      photo: `data:${e.photo.contentType};base64,${e.photo.data?.toString(
        "base64"
      )}`,
    };
  });
  res.send(posts);
});

post.post("/addPost", uploads.single("photo"), verify, async (req, res) => {
  const { id } = req;
  const photo = req.file;
  const { caption, location, userName } = req.body;

  const post = new Post({
    userId: id,
    photo: {
      data: fs.readFileSync("./Routes/uploads/" + req.file.filename),
      contentType: photo.mimeType,
    },
    caption,
    userName,
    location,
  });

  post
    .save()
    .then((response) => {
      res.send("Post saved successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
});

post.delete("/deletePost", async (req, res) => {
  const { id } = req.body;
  Post.deleteOne({ _id: id }).then((response) => {
    res.send(response);
  });
});

post.put("/updateLike", async (req, res) => {
  const { id, like } = req.body;

  Post.findOne({ _id: id }).then((response) => {
    console.log(response.like);
    console.log(like);
    if (response.like.includes(like) === true) {
      console.log("REmove");
      Post.updateOne({ _id: id }, { $pull: { like: like } }).then(
        (response) => {
          res.send(response);
        }
      );
    } else {
      console.log("Add");
      Post.updateOne({ _id: id }, { $push: { like: like } }).then(
        (response) => {
          console.log(response);
          res.send(response);
        }
      );
    }
  });
});

post.put("/addComments", verify, async (req, res) => {
  const { userName, message, queryId } = req.body;
  const { id } = req;

  Post.updateOne(
    { _id: queryId },
    {
      $push: {
        comment: { userName, message, id },
      },
    }
  )
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = post;
