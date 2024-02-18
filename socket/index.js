require("dotenv").config();
const express = require("express");
const app = express();
const connectToDb = require("./conn");
const http = require("http");
const cors = require("cors");
const Group = require("./Model/groupSchema");
const Message = require("./Model/messageSchema");

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

connectToDb();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world from Socket.io");
});

io.on("connection", (socket) => {
  console.log(`Connected`);

  socket.on("chat", async ({ from, userName, message }) => {
    try {
      let saveMessage = new Group({ sender: from, userName, message });
      await saveMessage
        .save()
        .then((res) => {
          console.log("Saved");
        })
        .catch((err) => {
          console.log(err);
        });
      io.local.emit("chat", saveMessage);
      saveMessage = {};
    } catch (errors) {
      console.log(errors);
    }
  });

  socket.on("join", ({ userId }) => {
    console.log(`${userId} User Joined`);
    socket.join(userId);
  });

  socket.on("message", async ({ from, to, message }) => {
    try {
      let saveMessage = new Message({ sender: from, receiver: to, message });
      await saveMessage
        .save()
        .then((res) => {
          console.log("Saved");
        })
        .catch((err) => {
          console.log(err);
        });
      io.local.emit("message", saveMessage);
      saveMessage = {};
    } catch (errors) {
      console.log(errors);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Disconnected`);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`The Socket.io server running at port ${process.env.PORT}`);
});
