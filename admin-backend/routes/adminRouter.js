const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {sendError} = require("../controllers/common");


router.post("/requestOTP", (req, res)=>{
	authController.requestOTP(req.body.phoneNumber)
	.then(response=>{
		res.json(response);
	})
	.catch(error=>{
		console.log(error);
		res.json(sendError("Internal Server Response"));
	})
});

router.post("/verifyOTP", (req, res)=>{
	authController.verify(req.body.phoneNumber, req.body.OTP)
	.then(response=>{
		res.json(response);
	})
	.catch(error=>{
		console.log(error);
		res.json(sendError("Internal Server Response"));
	})
});

module.exports = router;
