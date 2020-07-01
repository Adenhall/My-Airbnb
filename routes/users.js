var express = require('express');
const { createUser, getUsers } = require('../controllers/UserController');
const { loginRequired } = require('../middleware/auth');
var router = express.Router();

/* GET users listing. */
router.route('/')
.get(loginRequired ,getUsers)
.post(createUser)



module.exports = router;
