const rider = require("../models/riders");
const requester = require("../models/requesters");
const registrations = require("../models/registrations");
const otpController = require("./OTP_Controller.js");
const sms = require("./sms.js");
const {sendError, sendResponse} = require("./common.js");

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
			else
				return registrations.findOne({phoneNumber: phone});
		})
		.then(doc=>{
			if(doc)
			{
				userDoc = doc;
				//registration request already made.
				//This is just a resend.
				return otpController.resendOTP(doc.OTP)
			}
			else
			{
				//registration request is new
				userDoc = new registrations({
					type: type,
					phoneNumber: phone
				});

				return otpController.newOTP(userDoc);
			}
		})
		.then(()=>{
			return userDoc.save();
		})
		.then(()=>{
			sms.sendOTP(phone, userDoc.OTP.currentOTP);
			resolve(sendResponse(`Registration OTP set for ${phone}`));
		})
		.catch(error=>{
			console.log(error);
			reject(sendError("Internal Server Error"));
		})
	})
}

async function riderOTPVerify(phone, OTP, name)
{
	return new Promise((resolve, reject)=>{

		let registrationDoc;

		registrations.findOne({phoneNumber: phone})
		.then((doc)=>{
			if(!doc)
				resolve(sendError("OTP not set or expired!"));
			else
			{
				registrationDoc = doc;
				otpController.verifyOTP(registrationDoc, "rider", OTP)
				.then((token)=>{
					
					let riderData = new rider({
						name: name,
						phoneNumber: phone
					});
					riderData.save()
					.then(result=>{
						resolve(sendResponse(token));
					})
					.catch(error=>{
						console.log(error);
						reject(sendError("Internal Server Error"));
					})
				})
				.catch(error=>{
					resolve(sendError(error));
				})
				.finally(()=>{
					return registrationDoc.save()
				})
			}
		})
		.catch(error=>{
			console.log(error);
			reject(sendError("Internal Server Error"));
		})
	})
}
async function requesterOTPVerify(phone, OTP, yearOfBirth, name)
{
	return new Promise((resolve, reject)=>{
		
		let registrationDoc;

		registrations.findOne({phoneNumber: phone})
		.then((doc)=>{
			if(!doc)
				resolve(sendError("OTP not set or expired!"));
			else
			{
				registrationDoc = doc;
				otpController.verifyOTP(registrationDoc, "requester", OTP)
				.then((token)=>{

					let requesterData = new requester({
						name: name,
						phoneNumber: phone,
						yearOfBirth: yearOfBirth,
						defaultAddress: null
					});
					requesterData.save()
					.then(result =>{
						resolve(sendResponse(token));
					})
					.catch(error=>{
						console.log(error);
						reject(sendError("Internal Server Error"));
					})
				})
				.catch(error=>{
					resolve(sendError(error));
				})
				.finally(()=>{
					return registrationDoc.save()
				})
			}
		})
		.catch(error=>{
			console.log(error);
			reject(sendError("Internal Server Error"));
		})
	})
}

module.exports = {
	registrationRequestOTP,
	riderOTPVerify,
	requesterOTPVerify
};
