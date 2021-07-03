//Author: Poojitha

const express = require("express");
const router = express.Router();
const rider = require("../../models/riders");
const verifyToken = require("../common/tokenAuth");

const requests = require("../../models/request");

const checkIsRider = (req, res, next) => {
  if (req.user.userType == 'rider')
    next();
  else
    res.json({ status: "failure", message: "You are not a rider." });
}

router.use(verifyToken);
router.use(checkIsRider);

router.get("/profile", function (req, res) {
  rider.findOne({ phoneNumber: req.user.phoneNumber }, { phoneNumber: 1, name: 1, defaultAddress: 1 }, function (err, result) {
    if (err) {
      res.json({
        status: "failure",
        message: "Unable to retrieve data"
      })
      console.error(err);
    }
    else {
      res.json({
        status: "success",
        message: "Rider's profile",
        result: result
      })
    }
  })
})


router.put("/profile", function (req, res) {
  rider.findOneAndUpdate({ phoneNumber: req.user.phoneNumber }, { $set: { name: req.body.name } }, { new: true }, function (err, doc) {
    if (err) {
      res.json({
        status: "failure",
        message: "Unable to retrieve data"
      })
      console.error(err);
    }
    else {
      res.json({
        status: "success",
        message: "Rider's profile updated"
      })
    }
  })
})

router.get("/makeDelivery/:requestID", (req, res)=>{
		
		const {requestID} = req.params;
		let riderID;
		rider.findOne({phoneNumber: req.user.phoneNumber})
		.then(doc => {
			if(!doc)
				throw ({status:"failure", message: "Rider not found!"});
			else
				riderID = doc._id;
			return requests.findOne({requestID:requestID});
		})
		.then(doc=>{
			if(!doc)
				throw {status: "failure", message: "No such request found!"};
			
			if(doc.requestStatus != "PENDING")
				throw {status: "failure", message: "Request is not PENDING, you cannot take this up."};
			
			doc.requestStatus = "UNDER DELIVERY";
			doc.riderID = riderID;
			return doc.save();
		})
		.then(()=>{
			res.json({status: "success", message: "makeDelivery confirmed"});
		})
		.catch(error => {
			console.log(error);
			res.json(error);
		})
})

router.get("/requestDetails/:requestID", ( req, res )=>{
	const {requestID} = req.params;
	request.findOne({requestID: requestID})
	.then((doc)=>{
		if(!doc)
			res.json ({status: "failure", message: "No such request found!"});
		else
			res.json({status:"success", message: doc});
	})
	.catch(error=>{
		console.log(error);
		res.json({status:"failure", message: "Internal Server Error"});
	})
})

module.exports = router;

