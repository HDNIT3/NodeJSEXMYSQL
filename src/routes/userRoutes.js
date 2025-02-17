
const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middleware/async")
const acc = require("../controllers/auth")
const user = require("../controllers/user")

router.route("/users/register").post(asyncMiddleware(acc.register))
router.route("/users/login").post(asyncMiddleware(acc.login))
router.route("/users/getall").get(asyncMiddleware(user.GetALL))
router.route("/users/:id").get(asyncMiddleware(user.GetUserById))
router.route("/users/delete/:id").delete(asyncMiddleware(user.DeleteUser))
router.route("/users/update/:id").put(asyncMiddleware(user.UpdateUser))




module.exports = router;
