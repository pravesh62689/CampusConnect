const mongooose = require("mongoose");

const queriesSchema = new mongooose.Schema({
  userId: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  question: {
    type: String,
    require: true,
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

const Query = mongooose.model("queries", queriesSchema);
module.exports = Query;
