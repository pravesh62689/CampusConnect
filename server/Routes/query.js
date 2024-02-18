const express = require("express");
const query = express();
const verify = require("../Middlewares/index");
const Query = require("../Model/queriesSchema");

query.post("/addQuery", verify, async (req, res) => {
  const { id } = req;
  const { question, userName } = req.body;
  const query = new Query({
    userId: id,
    question,
    userName,
  });

  query
    .save()
    .then((response) => {
      res.send("Post saved successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
});

query.get("/getQueries", async (req, res) => {
  const queries = await Query.find().sort({ time: -1 });
  res.send(queries);
});

query.delete("/deleteQueries", async (req, res) => {
  const { id } = req.body;
  Query.deleteOne({ _id: id }).then((response) => {
    res.send(response);
  });
});

query.put("/updateVote", async (req, res) => {
  const { id, like } = req.body;

  Query.findOne({ _id: id }).then((response) => {
    console.log(response.like);
    console.log(like);
    if (response.like.includes(like) === true) {
      console.log("REmove");
      Query.updateOne({ _id: id }, { $pull: { like: like } }).then(
        (response) => {
          res.send(response);
        }
      );
    } else {
      console.log("Add");
      Query.updateOne({ _id: id }, { $push: { like: like } }).then(
        (response) => {
          console.log(response);
          res.send(response);
        }
      );
    }
  });
});

query.put("/addComments", verify, async (req, res) => {
  const { userName, message, queryId } = req.body;
  const { id } = req;

  Query.updateOne(
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

module.exports = query;
