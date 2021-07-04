const rider = require("../models/riders");
const requester = require("../models/requesters");
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

async function loginRequestOTP(type, phone)
{
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
			if(!doc)
			{
				resolve(sendError("No such phone number! Please register."));
			}
			else
			{
				userDoc = doc;

				//check if the OTP is already set.
				if(doc.OTP)
				{
					//OTP is already set, this is a resend.
					//update the OTP
					if(doc.OTP.resendsLeft <= 0)
						return resolve(sendError("Exceeded Max resends"));
					
					return otpController.resendOTP(doc.OTP)
				}
				else
				{
					return otpController.newOTP(doc);
				}
			}

		})
		.then(()=>{
			return userDoc.save();
		})
		.then(()=>{
			sms.sendOTP(phone, userDoc.OTP.currentOTP);
			resolve(sendResponse(`New OTP set`));
		})
		.catch(error=>{
			console.log(error);
			resolve(sendError("Internal Server Error"));
		})
	});
}

async function loginVerifyOTP(phone, OTP, type)
{
	return new Promise((resolve, reject)=>{
			
		let userModel;
		switch (type) {
			case "rider": userModel = rider; break;
			case "requester": userModel = requester; break;
			default: userModel = null;
		}
		if (!userModel)
			return resolve(sendError("Invalid User Type"));
		
		let userDoc;

		userModel.findOne({phoneNumber: phone})
		.then((doc)=>{
			if(!doc)
				return resolve(sendError(`${type} with phone ${phone} not found!, please register!`));
			else
			{
				userDoc = doc;
				otpController.verifyOTP(userDoc, type, OTP)
				.then(token =>{
					resolve(sendResponse(token));
				})
				.catch(errorMessage=>{
					console.log(errorMessage);
					resolve(sendError(errorMessage));
				})
			}
			return doc.save();
		})
		.catch(error=>{
			console.log(error);
			resolve(sendError("Internal Server Error"));
		})
	})
}
module.exports = {
	loginRequestOTP,
	loginVerifyOTP
};
