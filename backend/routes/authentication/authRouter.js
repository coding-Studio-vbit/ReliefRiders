const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const otp = require("./OTP");
const sms = require("../common/sms");
const rider = require("../../models/riders");
const requester = require("../../models/requesters");
const fs = require("fs").promises;


const OTP_FILE_PATH = "./TEMP_OTP.json";
const OTP_CLEAR_TIMEOUT_MINS = 5;
const MAX_OTP_GUESSES = 5;
const MAX_OTP_RESENDS = 10;


router.post("/login/requestOTP", (req, res)=>{

	if(!req.body.type || !req.body.phone)
		return res.json({status:"failure", message: "Invalid properties"});

	let userModel;

	const {type, phone} = req.body;

	switch(type)
	{
		case "rider": userModel = rider; break;
		case "requester":userModel = requester;break;
		default: userModel = null;
	}
	if(!userModel)
		return res.json({status:"failure", message: "Invalid user type!"});
	
	let OTP;

	userModel.findOne({
		phoneNumber: phone
	})
	.then(doc =>{
		if(doc == null)
		{
			throw {status: "failure", message: "No such phone number! Please register."};
		}
			//return res.json({status:"failure", message: "No such phone number! Please register."});

		//phone number is valid.
		//now create an otp and set it.
		return otp.generateOTP();
	})
	.then(Oteepee=>{
		OTP = Oteepee;
		return fs.readFile(OTP_FILE_PATH)
	})
	.then(data=>{
		let obj = JSON.parse(data);
		if(obj.hasOwnProperty(phone))
		{
			//if the OTP has already been set.
			//if it has, just update the OTP and decrement the number of resends
			if(obj[phone].otpResendsLeft > 0)
			{
				obj[phone].otpResendsLeft--;
				obj[phone].otp = OTP;
				console.log("New OTP set for " + req.body.type + " login");
				res.json({status: "success", message:"OTP Set"});
				sms.sendOTP(req.body.phone, OTP);
			}
			else
			{
				throw {status: "failure", message: "You have exceeded the number of OTP resends. Try again after sometime."};
			}
		}
		else
		{
			obj[phone] = {
				type: req.body.type, 
				otp: OTP,
				otpSetTime: Date.now(),
				otpTriesLeft: MAX_OTP_GUESSES,
				otpResendsLeft: MAX_OTP_RESENDS
			};
		}
		fs.writeFile(OTP_FILE_PATH, JSON.stringify(obj), 'utf-8', (err)=>{
			if(err){
				console.log("An error occured while writing to OTP_Temp.json");
				throw({status:"failure", message: "Server Internal Error"});
			}
			else{
				console.log("New " + req.body.type + " login OTP request.");
				res.json({status: "success", message:"OTP Set"});
				sms.sendOTP(req.body.phone, OTP);
			}
		})
	})
	.catch(err=>{
		console.log(err);
		return res.json(err);
	})
})

router.post("/login/verifyOTP", (req, res)=>{

	if(!req.body.phone ||  !req.body.OTP){
		return res.json({status:"failure", message: "Invalid properties"});
	}

	let {phone, OTP} = req.body;

	fs.readFile(OTP_FILE_PATH)
	.then(data=>{{
		let obj = JSON.parse(data.toString());
		if(obj.hasOwnProperty(phone)) //has the OTP even been set?
		{
			//check if OTP has expired.
			const timeDiffMins = (Date.now() - obj[phone].otpSetTime)/(1000 * 60);
			if(timeDiffMins > process.env.OTP_LIFE)
			{
				res.json({status: "failure", message: "OTP has expired, try again."});
			}
			//check if there are enough OTP tries left.
			else if(obj[phone].otpTriesLeft <= 0)
			{
				res.json({status: "failure", message: "Exceeded max. OTP tries. Try again."});
			}
			else if(obj[phone].otp == OTP)
			{
				//OTP match.

				var token = jwt.sign({
					phoneNumber: phone,
					userType: obj[phone].type
				}, process.env.TOKEN_SECRET);

				res.json({status:"success", message: token});
			}
			else
			{
				//OTP did not match.
				obj[phone].otpTriesLeft--;
				res.json({status:"failure", message: `OTP Invalid, ${obj[phone].otpTriesLeft} tries are left.`});
			}

		}
		else
		{
			res.json({status:"failure", message: "OTP has expired or has not been set!"});
		}
	}
		
	})
	.catch(error=>{
			console.log("An error occurred while reading ", OTP_FILE_PATH, error);
			res.json({status: "failure", message: "Server internal error"});
	})
})


router.post("/register/requestOTP", (req, res)=>{

	if(!req.body.phone || !req.body.type)
	{
		return res.json({status: "failure", message: "Invalid properties."});
	}

	let userModel;
	let OTP;

	const {type, phone} = req.body;

	switch(type)
	{
		case "rider": userModel = rider; break;
		case "requester":userModel = requester;break;
		default: userModel = null;
	}
	if(!userModel)
		return res.json({status:"failure", message: "Invalid user type!"});

	userModel.findOne({
		phoneNumber: phone
	})
	.then(doc=>{
		if(doc != null)
		{
			throw {status: "failure", message:"User already exists."}
		}
		return otp.generateOTP();
	})
	.then(Oteepee=>{
		OTP = Oteepee;
		return fs.readFile(OTP_FILE_PATH);
	})
	.then(data=>{
		let obj = JSON.parse(data);
		if(obj.hasOwnProperty(phone))
		{
			console.log("hi")
			//if the OTP has already been set.
			//if it has, just update the OTP and decrement the number of resends
			if(obj[phone].otpResendsLeft > 0)
			{
				obj[phone].otpResendsLeft--;
				obj[phone].otp = OTP;
				console.log("New OTP set for " + req.body.type + " login");
				res.json({status: "success", message:"OTP Set"});
				sms.sendOTP(req.body.phone, OTP);
			}
			else
			{
				throw {status: "failure", message: "You have exceeded the number of allowed OTP resends. Try again after sometime."}	
			}
		}
		else
		{
			
			obj[phone] = {
				type: req.body.type, 
				otp: OTP,
				otpSetTime: Date.now(),
				otpTriesLeft: MAX_OTP_GUESSES,
				otpResendsLeft: MAX_OTP_RESENDS
			};
		}

		return fs.writeFile(OTP_FILE_PATH, JSON.stringify(obj), 'utf-8')
	
	})
	.then(()=>{
			console.log("New " + req.body.type + " registration OTP request.");
			res.json({status: "success", message:"OTP Set"});
			sms.sendOTP(req.body.phone, OTP);
		
	})
	.catch(error=>{
		console.log(error)
		res.json(error)
	})
});


//rider register---------------------------------------------------------------------------------------------

router.post("/register/rider/verifyOTP", (req, res) => {
  if(!req.body.phone ||  !req.body.OTP ||!req.body.name){
    return res.json({status:"failure", message: "Invalid properties"});
  }

  let {phone, OTP} = req.body;

	fs.readFile(OTP_FILE_PATH)
	.then(data=>{
    	let obj = JSON.parse(data.toString());
    	if(obj.hasOwnProperty(phone))
    	{
				//check if OTP has expired.
				const timeDiffMins = (Date.now() - obj[phone].otpSetTime)/(1000 * 60);
				if(timeDiffMins > process.env.OTP_LIFE)
				{
					return res.json({status: "failure", message: "OTP has expired, try again."});
				}
				//check if there are enough OTP tries left.
				else if(obj[phone].otpTriesLeft <= 0)
				{
					return res.json({status: "failure", message: "Exceeded max. OTP tries. Try again."});
				}
				else if(obj[phone].otp == OTP)
				{
					//OTP match.
    	    		var token = jwt.sign({
    	    		  phoneNumber: phone,
    	    		  userType: obj[phone].type
    	    		}, process.env.TOKEN_SECRET);

    	    		let riderData = new rider({
    	    		  name : req.body.name,
    	    		  phoneNumber : req.body.phone
    	    		});
    	    		riderData.save()
    	    		.then(result => {
    	    		  console.log(riderData);
    	    		  return res.json({status:"success", message: token});
    	    		})
    	    		.catch(err => {
						console.log(err);
						res.json({
								status:"failure",
								message: "Rider could not be registered."
						})
    	    		})

				}
				else
				{
					//OTP did not match.
					obj[phone].otpTriesLeft--;
					return res.json({status:"failure", message: `OTP Invalid, ${obj[phone].otpTriesLeft} tries are left.`});
				}

    	}
    	else
    	{
    	  return res.json({status:"failure", message: "OTP has expired or has not been set!"});
    	}
	})
	.catch(error=>{
		console.log(error);
		return res.json({status:"failure", message: "server internal error!"});
	})
})

router.get("/allRiders",  function(req, res, next) {
    Rider.find( function (err, result) {
  if (err) {
    res.json({
    status:"failure",
    message: "Unable to retrieve data"
})
    console.error(err);
  }
  else {
  res.json({
    status:"success",
    message: "All Riders shown",
    result : result
  })
 }
})
})



//requeter request ----------------------------------------------------------------------------

router.post("/register/requester/verifyOTP", (req, res) => {
  if(!req.body.phone ||  !req.body.OTP || !req.body.yearOfBirth || !req.body.name){
    return res.json({status:"failure", message: "Invalid properties"});
  }

  let {phone, OTP} = req.body;

	fs.readFile(OTP_FILE_PATH)
	.then(data=>{
		
    	let obj = JSON.parse(data.toString());
    	if(obj.hasOwnProperty(phone))
    	{
				//check if OTP has expired.
				const timeDiffMins = (Date.now() - obj[phone].otpSetTime)/(1000 * 60);
				if(timeDiffMins > process.env.OTP_LIFE)
				{
					return res.json({status: "failure", message: "OTP has expired, try again."});
				}
				//check if there are enough OTP tries left.
				else if(obj[phone].otpTriesLeft <= 0)
				{
					return res.json({status: "failure", message: "Exceeded max. OTP tries. Try again."});
				}
				else if(obj[phone].otp == OTP)
				{
    	   			 var token = jwt.sign({
    	   			   phoneNumber: phone,
    	   			   userType: obj[phone].type
    	   			 }, process.env.TOKEN_SECRET);

		   			let requesterData = new requester({
		   		       name : req.body.name,
		   		       phoneNumber : req.body.phone,
		   		       yearOfBirth : req.body.yearOfBirth
		   		     });
    	   			 requesterData.save()
    	   			 .then(result => {
    	   			   console.log(requesterData);
    	   			   return res.json({status:"success", message: token});
    	   			 })
    	   			 .catch(err => {
		   			 		console.log(err);
		   			 		res.json({
		   			 				status:"failure",
		   			 				message: "Requester could not be registered."
		   			 		})
    	   			 })

				}
				else
				{
					//OTP did not match.
					obj[phone].otpTriesLeft--;
					return res.json({status:"failure", message: `OTP Invalid, ${obj[phone].otpTriesLeft} tries are left.`});
				}

    	}
    	else
    	{
    	  return res.json({status:"failure", message: "OTP has expired or has not been set!"});
    	}
	})
	.catch(error=>{
		console.log(error);
		return res.json({status: "failure", message:"server internal error"});
	})
})




router.get("/allRequesters",  function(req, res, next) {
    Requester.find( function (err, result) {
  if (err) {
    res.json({
    status:"failure",
    message: "Unable to retrieve data"
})
    console.error(err);
  }
  else {
  res.json({
    status:"success",
    message: "All Requesters shown",
    result : result
  })
 }
})
})

//--------------------------------------------------------------------------------------------

module.exports = router;
