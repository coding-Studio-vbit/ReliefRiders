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
				otpSetTime: Date.now();
				resendsLeft: process.env.MAX_OTP_RESENDS;
				guessesLeft: process.env.MAX_OTP_GUESSES;
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
				OTP.currentOTP = res;
				OTP.resendsLeft--;
				resolve();
			})
	})
}

module.exports = {
	newOTP,
	resendOTP
}
