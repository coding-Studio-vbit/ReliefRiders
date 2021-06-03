const express = require("express");
const router = express.Router();
const otp = require("./OTP");

router.post("/requestOTP", (req, res)=>{
	res.send("Requester OTP");
	/*
		Check if phone number exists in requester db.
		generate otp
		send
	*/
})

module.exports = router;
