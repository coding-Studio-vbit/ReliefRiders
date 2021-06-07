const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const otp = require("./OTP");
const sms = require("../common/sms");
const rider = require("../../models/riders");
const requester = require("../../models/requesters");
const fs = require("fs");


const OTP_FILE_PATH = "./TEMP_OTP.json";
const OTP_TIMEOUT_MINS = 5;


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
	.then(OTP=>{
		fs.readFile(OTP_FILE_PATH, (err, data)=>{
			if(err){
				console.log("An error occured while reading ", OTP_FILE_PATH, err);
				throw ({status: "failure", message: "Server internal error"});
			}
			else{
				let obj = JSON.parse(data);
				obj[phone] = {type: req.body.type, otp: OTP};
				fs.writeFile(OTP_FILE_PATH, JSON.stringify(obj), 'utf-8', (err)=>{
					if(err){
						console.log("An error occured while writing to OTP_Temp.json");
						throw({status:"failure", message: "Server Internal Error"});
					}
					else{

						//delete this OTP after 5 mins.

						setTimeout(()=>{
							fs.readFile(OTP_FILE_PATH, (err, data)=>{
								if(err){
									console.log("An error occured while trying to read and delete OTP from ", OTP_FILE_PATH, err);
								}
								let obj = JSON.parse(data);
								delete obj[phone];
								fs.writeFile(OTP_FILE_PATH, JSON.stringify(obj), 'utf-8', err=>{
									if(err){
										console.log("An error occured while writing to ", OTP_FILE_PATH, err);
									}
								})
							})
						}, OTP_TIMEOUT_MINS * 60 * 1000);

						// So after 5 mins, the OTP entry will not exist in the file.

						console.log("New " + req.body.type + " login OTP request.");
						res.json({status: "success", message:"OTP Set"});
						sms.sendOTP(req.body.phone, OTP);
					}
				})
			}
		});
	})
	.catch(err=>{
		console.log(err);
		return res.json(err);
	})
})

router.post("/verifyOTP", (req, res)=>{

	if(!req.body.phone ||  !req.body.OTP){
		return res.json({status:"failure", message: "Invalid properties"});
	}

	let {phone, OTP} = req.body;

	fs.readFile(OTP_FILE_PATH, (err, data)=>{
		if(err)
		{
			console.log("An error occurred while reading ", OTP_FILE_PATH, err);
			return res.json({status: "failure", message: "Server internal error"});
		}
		let obj = JSON.parse(data.toString());
		if(obj.hasOwnProperty(phone))
		{
			if(obj[phone].otp == OTP)
			{
				var token = jwt.sign({
					phoneNumber: phone,
					userType: obj[phone].type
				}, process.env.TOKEN_SECRET);

				return res.json({status:"success", message: token});
			}
			else
			{
				return res.json({status:"failure", message: "OTP Invalid"});
			}

		}
		else
		{
			return res.json({status:"failure", message: "OTP has expired or has not been set!"});
		}
	})

})


router.post("/register/requestOTP", (req, res)=>{

	if(!req.body.phone || !req.body.type)
	{
		return res.json({status: "failure", message: "Invalid properties."});
	}

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
	.then(OTP=>{

		fs.readFile(OTP_FILE_PATH, (err, data)=>{
			if(err){
				console.log("An error occured while reading ", OTP_FILE_PATH, err);
				throw ({status: "failure", message: "Server internal error"});
			}
			else{
				let obj = JSON.parse(data);
				obj[phone] = {type: req.body.type, otp: OTP};
				fs.writeFile(OTP_FILE_PATH, JSON.stringify(obj), 'utf-8', (err)=>{
					if(err){
						console.log("An error occured while writing to OTP_Temp.json");
						throw({status:"failure", message: "Server Internal Error"});
					}
					else{

						//delete this OTP after 5 mins.

						setTimeout(()=>{
							fs.readFile(OTP_FILE_PATH, (err, data)=>{
								if(err){
									console.log("An error occured while trying to read and delete OTP from ", OTP_FILE_PATH, err);
								}
								let obj = JSON.parse(data);
								delete obj[phone];
								fs.writeFile(OTP_FILE_PATH, JSON.stringify(obj), 'utf-8', err=>{
									if(err){
										console.log("An error occured while writing to ", OTP_FILE_PATH, err);
									}
								})
							})
						}, OTP_TIMEOUT_MINS * 60 * 1000);

						// So after 5 mins, the OTP entry will not exist in the file.

						console.log("New " + req.body.type + " registration OTP request.");
						res.json({status: "success", message:"OTP Set"});
						sms.sendOTP(req.body.phone, OTP);
					}
				})
			}
		});
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

  fs.readFile(OTP_FILE_PATH, (err, data)=>{
    if(err)
    {
      console.log("An error occurred while reading ", OTP_FILE_PATH, err);
      return res.json({status: "failure", message: "Server internal error"});
    }
    let obj = JSON.parse(data.toString());
    if(obj.hasOwnProperty(phone))
    {
      if(obj[phone].otp == OTP)
      {
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
        return res.json({status:"failure", message: "OTP Invalid"});
      }

    }
    else
    {
      return res.json({status:"failure", message: "OTP has expired or has not been set!"});
    }
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

  fs.readFile(OTP_FILE_PATH, (err, data)=>{
    if(err)
    {
      console.log("An error occurred while reading ", OTP_FILE_PATH, err);
      return res.json({status: "failure", message: "Server internal error"});
    }
    let obj = JSON.parse(data.toString());
    if(obj.hasOwnProperty(phone))
    {
      if(obj[phone].otp == OTP)
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
        return res.json({status:"failure", message: "OTP Invalid"});
      }

    }
    else
    {
      return res.json({status:"failure", message: "OTP has expired or has not been set!"});
    }
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
