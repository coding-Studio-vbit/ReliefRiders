//Author: Poojitha, Sai Kiran

const express = require("express");
const router = express.Router();
const riderController = require("../../controllers/riderController");
const verifyToken = require("../common/tokenAuth");
const { sendError, sendResponse } = require("../../controllers/common");

const checkIsRider = (req, res, next) => {
	if (req.user.type == 'rider')
		next();
	else
		res.json(sendResponse("You are not a rider"));
}

router.use(verifyToken);
router.use(checkIsRider);

router.get("/profile", function (req, res) {
	riderController.getRiderProfile(req.user.phoneNumber)
		.then(response => {
			res.json(response);
		})
		.catch(error => {
			console.log(error);
			res.json(sendError("Internal Server Error"));
		})
})


router.put("/profile", function (req, res) {
	riderController.updateRiderProfile(req.user.phoneNumber, req.body.name)
		.then(response => {
			res.json(response);
		})
		.catch(error => {
			console.log(error);
			res.json(sendError("Internal Server Error"));
		})
})

router.get("/makeDelivery/:requestID", (req, res) => {

	if (!req.params.requestID)
		res.json(sendError("No request ID mentioned"));
	else {
		riderController.makeDelivery(req.user.phoneNumber, req.params.requestID)
			.then(response => {
				res.json(response);
			})
			.catch(error => {
				console.log(error);
				res.json(sendError("internal server error"));
			})
	}
})


router.post("/finishDelivery", (req, res) => {

	riderController.finishDelivery(req.user.phoneNumber, req.files)
		.then(response => {
			res.json(response);
		})
		.catch(error => {
			console.log(error);
			res.json(sendError("internal server error"));
		})
})

router.get("/cancelDelivery", async (req, res) => {

	const response = await riderController.cancelDelivery(req.user.phoneNumber)
	//send data back
	res.json(response);
})

router.get("/requestDetails/:requestID", (req, res) => {

	if (!req.params.requestID)
		res.json(sendError("No request ID mentioned"));
	else {
		riderController.getRequestDetails(req.params.requestID)
			.then(response => {
				res.json(response);
			})
			.catch(error => {
				console.log(error);
				res.json(senderror("internal server error"));
			})
	}

})

router.get("/myDeliveries", (req, res) => {

	riderController.getMyDeliveries(req.user.phoneNumber)
		.then(response => {
			res.json(response);
		})
		.catch(error => {
			console.log(error);
			res.json(senderror("internal server error"));
		})
})

router.post("/showFetchedRequests", (req, res) => {
	const { longitude, latitude, maxDistance } = req.body;
	console.log(req.body);
	riderController.fetchRequests(req.user.phoneNumber, longitude, latitude, maxDistance)
		.then(response => {
			res.json(response);
		})
		.catch(error => {
			console.log(error);
			res.json(senderror("internal server error"));
		})
})

router.get("/currentRequest", (req, res) => {
	riderController.getCurrentRequest(req.user.phoneNumber)
		.then(response => {
			res.json(response);
		})
		.catch(error => {
			console.log(error);
			res.json(sendError("Internal Server Error"));
		})
})

module.exports = router;
