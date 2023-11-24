const express = require("express");
const {SignUp,getAll, login, userVerification, getUser} = require("../controller/control");
const router = express.Router();


router.post("/",SignUp);
router.post("/getall",getAll);
router.post('/login',login)
router.get("/verify",userVerification,getUser)

module.exports = router;
