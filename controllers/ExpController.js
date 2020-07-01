const Exp = require("../models/experience");
const Tag = require("../models/tag");

exports.createExp = async function (req, res) {
  try {
    const { title, description, tags } = req.body;

    if (!title || !description || !tags) {
      res.status(400).json({
        status: "NOT OK!",
        message: "Title, description, host and tags are required",
      });
    }

    const tagObj = await Tag.generateTags(tags);

    const exp = new Exp({
      title: title,
      description: description,
      host: req.user._id,
      tags: tagObj,
    });
    await exp.save();
    res.status(200).json({ status: "OK", exp });
  } catch (err) {
    res.status(400).json({ status: "NOT OK!", error: err.message });
  }
};
exports.getExp = async function (req, res) {
  try {
    const exp = await Exp.find();
    res.status(200).json({ status: "OK", data: exp });
  } catch (err) {
    res.status(400).json({ status: "NOT OK", error: err.message });
  }
};
exports.getSingleExp = async function (req, res) {
    
}