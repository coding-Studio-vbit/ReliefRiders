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
		let riderID, riderDoc;
		rider.findOne({phoneNumber: req.user.phoneNumber})
		.then(doc => {
			if(!doc)
				throw ({status:"failure", message: "Rider not found!"});
			else
			{
				riderID = doc._id;
				riderDoc = doc;
			}
			if(doc.currentStatus != "AVAILABLE")
				throw ({status: "failure", message: "Rider Status is invalid, cannot assign this request to rider."});

			return requests.findOne({requestID:requestID});
		})
		.then(doc=>{
			if(!doc)
				throw {status: "failure", message: "No such request found!"};
			
			if(doc.requestStatus != "PENDING")
				throw {status: "failure", message: "Request status is not PENDING, you cannot take this up."};
			
			//update request status
			doc.requestStatus = "UNDER DELIVERY";
			doc.riderID = riderID;
			//update rider status
			riderDoc.currentRequest = doc.requestID;
			riderDoc.currentRequestType = doc.requestType;
			riderDoc.currentStatus = "BUSY";
			return doc.save();
		})
		.then(()=>{
			return riderDoc.save();
		})
		.then(()=>{
			res.json({status: "success", message: "makeDelivery confirmed"});
		})
		.catch(error => {
			console.log(error);
			res.json(error);
		})
})


router.get("/finishDelivery", (req, res)=>{

	let riderDoc, requestDoc;

	rider.findOne({phoneNumber: req.user.phoneNumber})
	.then((doc)=>{
		if(!doc)
			throw ({status: "failure", message: "No such rider found!"});
		if(doc.currentStatus != "BUSY")
			throw ({status: "failure", message: "Rider is not BUSY, cannot finish delivery"});
		
		riderDoc = doc;
		return request.findOne({requestID: riderDoc.currentRequest});
	})
	.then((doc)=>{
		if(!doc)
			throw({status: "failure", message:"Cannot find the request to be finished."});
		else
		{
			requestDoc = doc;
			requestDoc.requestStatus = "CONFIRMED BY RIDER";
			riderDoc.currentStatus = "AVAILABLE";
			riderDoc.currentRequest = null;
			return res.json({status: "success", message: "finish delivery successful"});
		}
	})
	.catch(error=>{
		console.log(error);
		return res.json(error);
	})
})

router.get("/cancelDelivery", (req, res)=>{
	
	let riderDoc, requestDoc;

	rider.findOne({phoneNumber: req.user.phoneNumber})
	.then((doc)=>{
		if(!doc)
			throw ({status: "failure", message: "No such rider found!"});
		if(doc.currentStatus != "BUSY")
			throw ({status: "failure", message: "Rider is not BUSY, cannot cancel delivery"});
		
		riderDoc = doc;
		return request.findOne({requestID: riderDoc.currentRequest});
	})
	.then((doc)=>{
		if(!doc)
			throw({status: "failure", message:"Cannot find the request to be cancelled."});
		else
		{
			requestDoc = doc;
			requestDoc.requestStatus = "PENDING";
			riderDoc.currentStatus = "AVAILABLE";
			riderDoc.currentRequest = null;
			return res.json({status: "success", message: "cancel delivery successful"});
		}
	})
	.catch(error=>{
		console.log(error);
		return res.json(error);
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

router.get("/myDeliveries", (req, res)=>{
	let riderID;
	rider.findOne({phoneNumber: req.user.phoneNumber})
	.then((riderDoc)=>{
		return request.find({requestStatus: "DELIVERED", riderID: riderDoc._id})
	})
	.then(docs=>{
		return res.json({status: "success", message: docs.data.rows});
	})
	.catch(error=>{
		console.log(error);
		return res.json({status: "failure", message: error});
	})
})

module.exports = router;

