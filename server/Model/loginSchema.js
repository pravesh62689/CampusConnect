const mongooose = require("mongoose");

const loginSchema = new mongooose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  profile: {
    data: Buffer,
    contentType: String,
  },
});

const Login = mongooose.model("users", loginSchema);
module.exports = Login;
