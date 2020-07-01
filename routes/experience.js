const { createExp, getExp } = require("../controllers/ExpController")
const { loginRequired, hostRequired } = require("../middleware/auth")

const router = require("express").Router({mergeParams: true})

router.route("/")
.post(loginRequired, hostRequired ,createExp)
.get(loginRequired,getExp)

module.exports = router