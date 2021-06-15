/*
Author: Sai Kiran
	This script resets the TEMP_OTP.json file.
*/


require("dotenv").config();
const fs = require("fs").promises;

fs.writeFile("./TEMP_OTP.json", JSON.stringify({"dummy":"hi"}))
.then(()=>{
	console.log("done.")
})
.catch(error=>{
	console.log(error);
})
