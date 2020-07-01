const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const round = 10;
const jwt = require('jsonwebtoken')

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validator(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Invalid email!");
        }
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: [
      {
        type: String,
      },
    ],
    type: {
      type: String,
      enum: ["normal", "host"],
      required: [true, "Please input what type your is account"],
      default: "Normal"
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: {virtuals: true} }
);

schema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.__v;
    delete userObject.token;
    return userObject;
};

schema.methods.generateToken = async function () {
  const token = jwt.sign(
    {id: this._id}
  , process.env.SECRET, { expiresIn: '1h' });
  this.token.push(token);
  await this.save()
  return token
}

schema.pre("save", async function (req, res, next) {
  if (this.isModified("password")) {
       this.password = await bcrypt.hash(this.password, round)
  }
  next();
});

schema.statics.loginWithEmail = async function (email, password) {
  const user = await this.findOne({email:email});
  if (!user) {
    throw new Error("Unable to login");
  };
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Unable to login");
  };
  return user;
};

module.exports = mongoose.model("User", schema);
