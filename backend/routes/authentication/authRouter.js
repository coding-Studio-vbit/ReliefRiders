const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const otp = require("./OTP");
const sms = require("../common/sms");
const rider = require("../../models/riders");
const requester = require("../../models/requesters");
const fs = require("fs");


const OTP_FILE_PATH = "./TEMP_OTP.json";
const OTP_TIMEOUT_MINS = 5;


router.post("/requestOTP", (req, res)=>{

	if(!req.body.type || !req.body.phone)
		return res.json({status:"failure", message: "Invalid properties"});
	
	let userModel;

	const {type, phone} = req.body;

	switch(type)
	{
		case "rider": userModel = rider; break;
		case "requester":userModel = requester;break;
		default: userModel = null;
	}
	if(!userModel)
		return res.json({status:"failure", message: "Invalid user type!"});


	userModel.findOne({
		phoneNumber: phone
	})
	.then(doc =>{
		if(doc == null)
		{
			throw {status: "failure", message: "No such phone number! Please register."};
		}
			//return res.json({status:"failure", message: "No such phone number! Please register."});

		//phone number is valid.
		//now create an otp and set it.
		return otp.generateOTP();
	})
	.then(OTP=>{
		fs.readFile(OTP_FILE_PATH, (err, data)=>{
			if(err){
				console.log("An error occured while reading ", OTP_FILE_PATH, err);
				throw ({status: "failure", message: "Server internal error"});
			}
			else{
				let obj = JSON.parse(data);
				obj[phone] = {type: req.body.type, otp: OTP};
				fs.writeFile(OTP_FILE_PATH, JSON.stringify(obj), 'utf-8', (err)=>{
					if(err){
						console.log("An error occured while writing to OTP_Temp.json");
						throw({status:"failure", message: "Server Internal Error"});
					}
					else{

						//delete this OTP after 5 mins.
						
						setTimeout(()=>{
							fs.readFile(OTP_FILE_PATH, (err, data)=>{
								if(err){
									console.log("An error occured while trying to read and delete OTP from ", OTP_FILE_PATH, err);
								}
								let obj = JSON.parse(data);
								delete obj[phone];
								fs.writeFile(OTP_FILE_PATH, JSON.stringify(obj), 'utf-8', err=>{
									if(err){
										console.log("An error occured while writing to ", OTP_FILE_PATH, err);
									}
								})
							})
						}, OTP_TIMEOUT_MINS * 60 * 1000);

						// So after 5 mins, the OTP entry will not exist in the file.

						console.log("New " + req.body.type + " login OTP request.");
						res.json({status: "success", message:"OTP Set"});
						sms.sendOTP(req.body.phone, OTP);
					}
				})
			}
		});
	})
	.catch(err=>{
		console.log(err);
		return res.json(err);
	})
})

router.post("/verifyOTP", (req, res)=>{

	if(!req.body.phone || !req.body.type || !req.body.OTP){
		return res.json({status:"failure", message: "Invalid properties"});
	}

	let {phone, type, OTP} = req.body;
	let userModel;
	switch(type)
	{
		case "rider": userModel = rider; break;
		case "requester":userModel = requester;break;
		default: userModel = null;
	}
	if(!userModel)
		return res.json({status:"failure", message: "Invalid user type!"});
	
	fs.readFile(OTP_FILE_PATH, (err, data)=>{
		if(err)
		{
			console.log("An error occurred while reading ", OTP_FILE_PATH, err);
			return res.json({status: "failure", message: "Server internal error"});
		}
		let obj = JSON.parse(data);
		if(obj.hasOwnProperty(phone))
		{
			const tempData = JSON.parse(JSON.stringify(obj));

			if(tempData[phone].type == type && tempData[phone].OTP == OTP)
			{
				var token = jwt.sign({
					phoneNumber: phone,
					userType: type
				}, process.env.TOKEN_SECRET);
				
				return res.json({token: token});
			}
			else
			{
				return res.json({status:"failure", message: "OTP Invalid"});
			}
			
		}
		else
		{
			return res.json({status:"failure", message: "OTP has expired or has not been set!"});
		}
	})
	
})

module.exports = router;
