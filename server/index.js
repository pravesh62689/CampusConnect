require("dotenv").config();
const express = require("express");
const app = express();
const connectToDb = require("./Db/conn");
const cors = require("cors");
const bodyParser = require("body-parser");
const verify = require("./Middlewares/index");
const Message = require("./Model/messageSchema");
const login = require("./Routes/login");
const post = require("./Routes/post");
const query = require("./Routes/query");
const Group = require("./Model/groupSchema");

connectToDb();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/login", login);
app.use("/post", post);
app.use("/query", query);

app.post("/getMessages/:userId", verify, async (req, res) => {
  const { userId } = req.params;
  let { id } = req;
  id = id?.toString();

  try {
    const messages = await Message.find({
      $or: [
        { sender: id, receiver: userId },
        { sender: userId, receiver: id },
      ],
    }).sort({
      createdAt: 1,
    });

    res.send(messages);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.get("/",(req,res)=>{
	res.send("Hello world from Backend");
});

app.get("/getGroupChat", async (req, res) => {
  const messages = await Group.find().sort({
    createdAt: 1,
  });
  res.send(messages);
});

app.listen(process.env.PORT, () => {
  console.log(`The server running at port ${process.env.PORT}`);
});
