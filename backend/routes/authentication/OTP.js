async function generateOTP()
{
	return new Promise((resolve, reject)=>{
		let OTP = "";
		for(let a = 6; a>0; a--)
		{
			OTP = OTP + Math.floor(Math.random()*10);
		}
		return resolve(OTP);
	});
}

module.exports = {
	generateOTP
};
