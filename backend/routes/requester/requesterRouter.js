//Author: Poojitha, Sai Kiran
const express = require("express");
const router = express.Router();
const tokenAuth = require("../common/tokenAuth");
const {sendError, sendResponse} = require("../../controllers/common");
const requesterController = require("../../controllers/requesterController");

//middleware to check if the user is a requester
const checkIsRequester = (req, res, next) => {
	if (req.user.type == 'requester')
		next();
	else
		res.json(sendError("You are not a requester"));
}

//this router's endpoints are protected.
router.use(tokenAuth);
router.use(checkIsRequester);

router.get("/confirmRequest/:requestID", (req, res) => {
	const phone = req.user.phoneNumber;
	if (!req.params.requestID) {
		return res.json(sendError("Invalid Parameters"));
	}

	requesterController.confirmRequest(phone, requestID)
	.then(response=>{
		res.json(response);
	})
	.catch(error=>{
		console.log(error);
		res.json(sendError("Internal Server Error"));
	})
})

router.get("/cancelRequest/:requestID", (req, res) => {
	const phone = req.user.phoneNumber;
	if (!req.params.requestID) {
		return res.json(sendError("Invalid Parameters"));
	}
	
	requesterController.cancelRequest(phone, requestID)
	.then(response=>{
		res.json(response);
	})
	.catch(error=>{
		console.log(error);
		res.json(sendError("Internal Server Error"));
	})
})
router.get("/profile", function (req, res) {
	
	requesterController.getRequesterProfile(req.user.phoneNumber)
	.then(response=>{
		res.json(response);
	})
	.catch(error=>{
		console.log(error);
		res.json(sendError("Internal Server Error"));
	})
})

router.put("/profile", function (req, res) {
	requesterController.updateRequesterProfile(req.user.phoneNumber, req.body)
	.then(response=>{
		res.json(response);
	})
	.catch(error=>{
		console.log(error);
		res.json(sendError("Internal Server Error"));
	})
})

router.get("/myRequests", (req, res) => {
	requesterController.fetchMyRequests(req.user.phoneNumber)
	.then(response=>{
		res.json(response);
	})
	.catch(error=>{
		console.log(error);
		res.json(sendError("Internal Server Error"));
	})
});

module.exports = router;
