const express = require("express");
const router = express.Router();
const otp = require("./OTP");
const sms = require("../common/sms");
const rider = require("../../models/rider");
const requester = require("../../models/requester");

router.use("/requestOTP", (req, res)=>{
	if(!req.body.type || !req.body.phone)
		return res.status(400).json({err: "Invalid properties"});
	
	let userModel;

	if(req.body.type == "rider")
		userModel = rider;
	else if(req.body.type == "requester")
		userModel = requester;
	else{
		return res.status(400).json({err: "Invalid user type!"});
	}


	userModel.findOne({
		phoneNumber: phone
	})
	.then(doc =>{
		if(doc == null)
			return res.json({err: "No such phone number! Please register."});

		//phone number is valid.
		//now create an otp and set it.
		return otp.generateOTP();
	})
	.then(OTP=>{
		fs.readFile("../OTP_Temp.json", (err, data)=>{
			if(err){
				console.log("An error occured while reading OTP_Temp.json", err);
				return res.status(500).json({err: "Server internal error"});
			}
			else{
				let obj = JSON.parse(data);
				obj[phone] = {type: req.body.type, otp: OTP};
				fs.writeFile("../OTP_Temp.json", JSON.stringify(obj), 'utf-8', (err)=>{
					if(err){
						console.log("An error occured while writing to OTP_Temp.json");
						return res.status(500).json({err: "Server Internal Error"});
					}
					else{
						console.log("New " + req.body.type + " login OTP request.");
						sms.sendOTP(req.body.phone, OTP);
					}
				})
			}
		});
	})
	.catch(error=>{
		console.log(error);
		return res.status(500).json({err: "Server internal error"});
	})
})

module.exports = router;
