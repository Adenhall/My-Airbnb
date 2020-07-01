const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.loginRequired = async function (req, res, next) {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      res.status(401).json({ status: "NOT OK!", message: "Unauthorized" });
    }
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.decode(token, process.env.SECRET);
    const user = await User.findById(decoded.id);
    if (!user)
      return res
        .status(401)
        .json({ status: "NOT OK!", message: "Unauthorized" });
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ satus: "NOT OK!", error: err.message });
  }
};

exports.hostRequired = async function (req, res, next) {
  if (req.user.type !== "host") {
    res.status(401).json({status: "NOT OK!", message: "Unauthorized"})
  }
  next();
}