const jwt = require("jsonwebtoken");
async function generateOTP()
{
	return new Promise((resolve, reject)=>{
		let res = "";
		for(let a = 6; a>0; a--)
			res = res + Math.floor(Math.random()*10);
		resolve(res);
	})
}

async function newOTP(doc)
{
	return new Promise((resolve, reject)=>{

		generateOTP()
		.then(res=>{
			doc.OTP = ({
				currentOTP: res,
				otpSetTime: Date.now(),
				resendsLeft: process.env.MAX_OTP_RESENDS,
				guessesLeft: process.env.MAX_OTP_GUESSES,
			})	
			resolve();
		})
		.catch(error=>{
			console.log(error);
		})
	})	
}

async function resendOTP(OTP)
{
	return new Promise((resolve, reject)=>{
			generateOTP()
			.then(res=>{
				OTP.otpSetTime = Date.now(),
				OTP.currentOTP = res;
				OTP.resendsLeft--;
				resolve();
			})
	})
}

async function verifyOTP(userDoc, type, otpGuess)
{
	return new Promise((resolve, reject)=>{
		
		if(!userDoc.OTP)
			reject("No OTP object found!")
		else if(userDoc.OTP.guessesLeft <= 0)
		{
			const timeDiff = (Date.now() - userDoc.OTP.otpSetTime)/(1000 * 60);
			if(timeDiff > OTP_PUNISHMENT_INTERVAL)
				userDoc.OTP.guessesLeft = 10;
			else
				reject("You have exceeded the maximum number of OTP tries, please try again after some time.");
		}
		if(userDoc.OTP.guessesLeft > 0)
		{
			const timeDiffMins = (Date.now() - userDoc.OTP.otpSetTime)/(1000 * 60);
				if(timeDiffMins > process.env.OTP_LIFE){
					reject("OTP has expired. Try resend OTP.");
				}
				else
				{
					if(userDoc.OTP.currentOTP == otpGuess)
					{
						token = jwt.sign({
							phoneNumber: userDoc.phoneNumber,
							type: type
						}, process.env.TOKEN_SECRET);

						resolve(token);
					}
					else
					{
						userDoc.OTP.guessesLeft--;
						reject(`Wrong OTP, ${userDoc.OTP.guessesLeft} guesses left.`)
					}
				}
		}
	})
}

module.exports = {
	newOTP,
	resendOTP,
	verifyOTP
}
