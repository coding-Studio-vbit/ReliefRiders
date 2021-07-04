const requesters = require("../models/requester");

async function getRequesterByPhone(phoneNumber){
	return new Promise((resolve, reject)=>{
		
		requesters.findOne({phoneNumber: phoneNumber})
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
	getRider,
};
