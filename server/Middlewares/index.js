const Login = require("../Model/loginSchema");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const { token } = req.body;
  if (token) {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const user = await Login.findById(decode.user);
    if (user) {
      req.id = user._id;
    } else {
      res.send("Unautorized");
    }
  } else {
    res.send("Unautorized");
  }
  next();
};

module.exports = verifyToken;
