const riders = require("../models/rider");
const requesters = require("../models/requester");
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
	return new Promise((reject, resolve)=>{
		
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
						return resolve(sendError("Exceeded Max resends")):
					
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
			resolve(sendResponse(`New OTP set for ${userDoc.phoneNumber}: ${userDoc.OTP.currentOTP}`));
		})
		.catch(error=>{
			console.log(error);
			sendError("Internal Server Error");
		})
	});
}

async function verifyOTP(phone, OTP, type)
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
		.then((doc)=>{
			if(!doc)
				return resolve(sendError(`${type} with phone ${phone} not found!, please register!`));
			else
			{
				userDoc = doc;
				if(!userDoc.OTP)
					resolve(sendError("OTP has not been set."));
				else if(userDoc.OTP.guessesLeft <= 0)
				{
					resolve(sendError("You have exceeded the maximum number of OTP guesses, please try again after some time."));
				}
				else
				{
					const timeDiffMins = (Date.now() - userDoc.OTP.otpSetTime)/(1000 * 60);
						if(timeDiffMins > process.env.OTP_LIFE){
							resolve(sendError("OTP has expired. Try resend OTP."));
						}
						else
						{
							if(userDoc.OTP.currentOTP == OTP)
							{
								userDoc.OTP = null;
								token = jwt.sign({
									phoneNumber: phone,
									type: type
								}, process.env.TOKEN_SECRET);

								resolve(sendResponse(token));
							}
							else
							{
								userDoc.OTP.guessesLeft--;
								resolve(sendError(`Wrong OTP, ${userDoc.OTP.guessesLeft} guesses left.`))
							}
						}
				}
			}
			return doc.save();
		})
		.catch(error=>{
			console.log(error);
			reject(sendError("Internal Server Error"));
		})
	})
}
module.exports = {
	
};
