const express = require("express");
const multer = require("multer");
const login = express();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const verify = require("../Middlewares/index");
const fs = require("fs");

const Login = require("../Model/loginSchema");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Routes/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const uploads = multer({ storage: Storage });

login.post("/", uploads.single("profile"), async (req, res) => {
  const { name, email, password } = req.body;
  const profile = req.file;
  const userName =
    name?.split(" ")[0].toLowerCase() + Math.floor(Math.random() * 100000 + 1);

  const hashedPassword = await bcrypt.hash(password, salt);

  const existingUser = await Login.findOne({ email });

  if (existingUser) {
    res.send("User already Exists");
  } else {
    if (profile) {
      const user = Login({
        name,
        userName,
        email,
        password: hashedPassword,
        profile: {
          data: fs.readFileSync("./Routes/uploads/" + req.file.filename),
          contentType: profile.mimeType,
        },
      });
      user
        .save()
        .then((result) => {
          res.send(user);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const user = Login({
        name,
        userName,
        email,
        password: hashedPassword,
      });
      user
        .save()
        .then((result) => {
          res.send(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});

login.post("/sign-in", async (req, res) => {
  const { password, email } = req.body;

  const user = await Login.findOne({
    $or: [{ email: email }, { userName: email }],
  });
  if (user) {
    const comparePassword = await bcrypt.compare(password, user.password);
    if (comparePassword) {
      const token = await jwt.sign(
        {
          user: user._id,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      res.send({ token });
    } else {
      res.send("Credentials are not true");
    }
  } else {
    res.send("Credentials are not true");
  }
});

login.post("/checkUser", async (req, res) => {
  const { token } = req.body;

  if (token) {
    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      let user = await Login.findById(decode.user);
      if (user) {
        user = {
          _id: user._id,
          name: user.name,
          email: user.email,
          userName: user.userName,
          password: user.password,
          profile: `${
            user?.profile.data !== undefined
              ? `data:${
                  user.profile.contentType
                };base64,${user.profile.data?.toString("base64")}`
              : ""
          }`,
        };
        res.status(200).send(user);
      } else {
        res.status(201).send("Unautorized");
      }
    } catch (err) {
      res.status(201).send(err);
    }
  } else {
    res.status(201).send("Unautorized");
  }
});

login.post("/getUser", verify, async (req, res) => {
  const { id } = req;
  let users = await Login.find();
  users = users.filter((e) => {
    return e._id.toString() !== id.toString();
  });
  users = users.map((user) => {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      userName: user.userName,
      password: user.password,
      profile: `${
        user?.profile.data !== undefined
          ? `data:${
              user.profile.contentType
            };base64,${user.profile.data?.toString("base64")}`
          : ""
      }`,
    };
  });
  res.send(users);
});

login.post("/getUserById", async (req, res) => {
  const { id } = req.body;
  let user = await Login.findOne({ _id: id });
  user = {
    ...user,
    profile: `${
      user?.profile.data !== undefined
        ? `data:${
            user.profile.contentType
          };base64,${user.profile.data?.toString("base64")}`
        : ""
    }`,
  };
  res.send(user);
});

module.exports = login;
