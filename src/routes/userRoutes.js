const { compareSync } = require("bcryptjs");
const express = require("express");
const router = express.Router();

const acc = require("../controllers/auth")

router.route("/users").post(acc.register)

module.exports = router;
