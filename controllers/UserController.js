const User = require('../models/user');

exports.createUser = async function(req, res, next) {
    try {
        const {email, password, name, type} = req.body
    if (!email || !password || !name || !type) {
        res.status(400).json({status: "NOT OK!", message: "Name, password and email is required"})
    }
    
    const user = new User({
        name: name,
        email: email,
        password: password,
        type: type || "normal"
    })
    await user.save()
    const token = await user.generateToken();
    res.status(200).json({status: "OK", data: user, token: token})
    } catch (err) {
        res.status(400).json({status: "NOT OK!", error: err.message})
    }
}

exports.getUsers = async (req, res) => {
    console.log(req.user)
    try {
        const user = await User.find();
        res.status(200).json({status: "OK", data: user})
    } catch (err) {
        res.status(400).json({status: "NOT OK!", error: err.message})
    }
}