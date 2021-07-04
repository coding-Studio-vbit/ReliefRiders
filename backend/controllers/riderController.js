const riders = require("../models/rider");

async function getRiderByPhone(phoneNumber){
	return new Promise((resolve, reject)=>{
		
		riders.findOne({phoneNumber: phoneNumber})
		.then((doc)=>{
			resolve(doc);
		})
		.catch(error=>{
			console.log(error);
			reject(error);
		})
	})
}


module.exports ={
	getRiderByPhone,
};
