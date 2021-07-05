//Author: Poojitha, Sai Kiran
const express = require("express");
const router = express.Router();
const tokenAuth = require("../common/tokenAuth");
const request = require("../../models/request");
const requester = require("../../models/requesters");


//middleware to check if the user is a requester
const checkIsRequester = (req, res, next) => {
	if (req.user.userType == 'requester')
		next();
	else
		res.json({ status: 'failure', message: 'You are not a requester!' });
}


//this router's endpoints are protected.
router.use(tokenAuth);
router.use(checkIsRequester);

router.get("/confirmRequest/:requestID", (req, res) => {
	const phone = req.user.phoneNumber;
	if (!req.params.requestID) {
		return res.json({ status: "failure", message: "invalid parameters" });
	}
	//Request can be confirmed only if the current status is "Rider Confirmed"
	//first check if the request was placed by this user itself.

	request.findOne({ requestNumber: req.params.requestID })
		.populate('requesterID')
		.then(doc => {
			if (doc == null) {
				throw { status: "failure", message: "No such request found!" };
			}
			else {
				if (phone != doc.requesterID.phoneNumber)
					throw { status: "failure", message: "you are unauthorized to access this request." };
				//request is made by this person only.
				//Now check if the status is "Rider Confirmed or not."
				if (doc.requestStatus != "RIDER CONFIRMED")
					throw { status: "failure", message: "Cannot confirm this request, status is not RIDER CONFIRMED" };

				doc.requestStatus = "DELIVERED";
				return doc.save()
			}
		})
		.then(() => {
			res.send({ status: "success", message: "Confirm Successful" });
		})
		.catch(error => {
			console.log(error);
			res.json(error)
		})
})

router.get("/cancelRequest/:requestID", (req, res) => {
	const phone = req.user.phoneNumber;
	if (!req.params.requestID) {
		return res.json({ status: "failure", message: "invalid parameters" });
	}
	//Request can be confirmed only if the current status is "Rider Confirmed"
	//first check if the request was placed by this user itself.

	request.findOne({ requestNumber: req.params.requestID })
		.populate('requesterID')
		.then(doc => {
			if (doc == null) {
				throw { status: "failure", message: "No such request found!" };
			}
			else {
				if (phone != doc.requesterID.phoneNumber)
					throw { status: "failure", message: "you are unauthorized to access this request." };
				//request is made by this person only.
				//Now check if the status is "PENDING"
				if (doc.requestStatus != "PENDING")
					throw { status: "failure", message: "Cannot cancel this request, status is not PENDING" };

				doc.requestStatus = "CANCELLED";
				return doc.save();
			}
		})
		.then(() => {
			res.send({ status: "success", message: "Cancel Successful" });
		})
		.catch(error => {
			console.log(error);
			res.json(error)
		})
})
router.get("/profile", function (req, res) {
	requester.findOne({ phoneNumber: req.user.phoneNumber }, { phoneNumber: 1, name: 1, defaultAddress: 1, yearOfBirth: 1 }, function (err, result) {
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
				message: "Requester's profile",
				result: result
			})
		}
	})
})


router.put("/profile", function (req, res) {
	requester.findOneAndUpdate({ phoneNumber: req.user.phoneNumber }, { $set: { name: req.body.name, yearOfBirth: req.body.yearOfBirth, 'defaultAddress.addressLine': req.body.defaultAddress.addressLine, 'defaultAddress.city': req.body.defaultAddress.city, 'defaultAddress.pincode': req.body.defaultAddress.pincode } }, { new: true }, function (err, doc) {
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
				message: "Requester's profile updated"
			})
		}
	})
})

router.get("/myRequests", (req, res) => {
	requester.findOne({ phoneNumber: req.user.phoneNumber })
		.then(doc => {
			if (!doc)
				throw { status: "failure", message: "Invalid user!" };
			return request.find({ requesterID: doc._id });
		})
		.then(docs => {
			res.json({ status: "success", message: docs });
		})
		.catch(error => {
			console.log(error);
			return res.json(error);
		})
});

module.exports = router;
