//Author: Sai Kiran
require("dotenv").config();
const fs = require("fs").promises;

/*
	This function removes all the expired OTP entries from the TEMP_OTP.json file.
	This function calls itself at regular intervals, the interval being defined in the .env file as OTP_FILE_CLEAR_INTERVAL.
*/

function clearExpiredOTP()
{
	fs.readFile("./TEMP_OTP.json")
	.then(data=>{
		let obj = JSON.parse(data.toString());
		for(phone in obj)
		{
			let timeDiff = (Date.now() - obj[phone].otpSetTime)/(1000 * 60);
			if(timeDiff > process.env.OTP_LIFE)
			{
				delete obj[phone];
			}
		}
		obj["dummy"] = "hi";
		return fs.writeFile("./TEMP_OTP.json", JSON.stringify(obj));
	})
	.then(()=>{
		setTimeout(()=>{
		clearExpiredOTP();
	}, process.env.OTP_FILE_CLEAR_INTERVAL * 1000 * 60);
	})
	.catch(error=>{
		console.log(error);
	})

}

module.exports = ()=>{
	clearExpiredOTP();
}
