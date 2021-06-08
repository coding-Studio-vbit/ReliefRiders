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
		console.log(obj)
		for(phone in obj)
		{
			let timeDiff = (Date.now() - obj[phone].otpSetTime)/(1000 * 60);
			if(timeDiff > process.env.OTP_LIFE)
			{
				console.log(phone)
				delete obj[phone];
			}
		}
		fs.writeFile("./TEMP_OTP.json", JSON.stringify(obj));
	})
	.then(()=>{
		console.log("done.")
	})
	.catch(error=>{
		console.log(error);
	})

	setTimeout(()=>{
		clearExpiredOTP();
	}, process.env.OTP_FILE_CLEAR_INTERVAL * 1000 * 60);
}

module.exports = ()=>{
	clearExpiredOTP();
}
