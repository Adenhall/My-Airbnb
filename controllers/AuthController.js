const User = require('../models/user')

exports.login = async function (req, res) {
    try {
      // make sure there are email and password in the request
      const { email, password } = req.body;
      if (!email && !password) throw new Error("Email and password are required")
      // authenticate user
      const user = await User.loginWithEmail(email, password);
      const token = user.generateToken();
      res.json({ status: "OK", data: { user } });
    } catch (err) {
      res.status(400).json({ status: "NOT OK!", message: err.message });
    };
  };