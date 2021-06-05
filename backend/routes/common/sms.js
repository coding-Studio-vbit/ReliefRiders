
async function sendOTP(phoneNumber, OTP)
{
	//SMS SENDING CODE GOES HERE.
	//until then we only have this.
	return new Promise((resolve, reject)=>{
		console.log("Relief Riders OTP: ", OTP);
		resolve();
	})
}

module.exports = {
	sendOTP
};
