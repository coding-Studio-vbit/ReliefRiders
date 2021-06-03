const express = require("express");
const router = express.Router();
const riderAuthRouter = require("./riderAuth")
const requesterAuthRouter = require("./requesterAuth")
const otp = require("./OTP");

router.use("/rider", riderAuthRouter);
router.use("/requester", requesterAuthRouter);

module.exports = router;
