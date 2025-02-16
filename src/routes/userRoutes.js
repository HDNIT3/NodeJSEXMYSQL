
const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middleware/async")
const acc = require("../controllers/auth")

router.route("/users/register").post(asyncMiddleware(acc.register))
router.route("/users/login").post(asyncMiddleware(acc.login))


module.exports = router;
