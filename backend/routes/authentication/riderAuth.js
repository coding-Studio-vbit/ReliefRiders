const express = require("express");
const router = express.Router();
const otp = require("./OTP");

router.post("/rider/requestOTP", (req, res)=>{
	res.send("Rider OTP");

	/*
		Check if phone number exists in Rider db
		generate otp
		send otp.
	*/
})

module.exports = router;
