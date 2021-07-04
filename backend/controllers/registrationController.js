const riders = require("../models/rider");
const requesters = require("../models/requester");
const registrations = require("../models/reqistrations");
const otpController = require("./OTP_Controller.js");
const sms = require("./sms.js");

function sendError(message)
{
	return {
		status: "failure",
		message: message
	}
}

function sendResponse(message)
{
	return {
		status: "success",
		message: message
	}
}
async function registrationRequestOTP(phone, type){
	return new Promise((resolve, reject)=>{
		
		let userModel;
		switch (type) {
			case "rider": userModel = rider; break;
			case "requester": userModel = requester; break;
			default: userModel = null;
		}
		if (!userModel)
			return resolve({ status: "failure", message: "Invalid user type!" });

		
		let userDoc;

		userModel.findOne({phoneNumber: phone})
		.then(doc =>{
			if(doc)
			{
				resolve(sendError("User Already Exists"));
			}
			return registrations.findOne({phoneNumber: phone});
		})
		.then(doc=>{
			if(doc)
			{
				//registration request already made.
				//This is just a resend.
			}
			else
			{
				//registration request is new

			}
		})
	})
}
