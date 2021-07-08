//Author: Poojitha, Sai Kiran

const express = require("express");
const router = express.Router();
const riderController = require("../../controllers/riderController");
const verifyToken = require("../common/tokenAuth");
const {sendError, sendResponse} = require("../../controllers/common");

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
	.then(response=>{
		res.json(response);
	})
	.catch(error=>{
		console.log(error);
		res.json(sendError("Internal Server Error"));
	})
})


router.put("/profile", function (req, res) {
	riderController.updateRiderProfile(req.user.phoneNumber, req.body.name)
	.then(response=>{
		res.json(response);
	})
	.catch(error=>{
		console.log(error);
		res.json(sendError("Internal Server Error"));
	})
})

router.get("/makeDelivery/:requestID", (req, res)=>{
	
	if(!req.params.requestID)
		res.json(sendError("No request ID mentioned"));
	else
	{
		ridercontroller.makedelivery(req.user.phonenumber, req.params.requestid)
		.then(response=>{
			res.json(response);
		})
		.catch(error=>{
			console.log(error);
			res.json(senderror("internal server error"));
		})
	}
})


router.get("/finishDelivery", (req, res)=>{

	riderController.finishDelivery(req.user.phoneNumber)
	.then(response=>{
		res.json(response);
	})
	.catch(error=>{
		console.log(error);
		res.json(senderror("internal server error"));
	})
})

router.get("/cancelDelivery", (req, res)=>{
	
	riderController.cancelDelivery(req.user.phoneNumber)
	.then(response=>{
		res.json(response);
	})
	.catch(error=>{
		console.log(error);
		res.json(senderror("internal server error"));
	})
})

router.get("/requestDetails/:requestID", ( req, res )=>{

	if(!req.params.requestID)
		res.json(sendError("No request ID mentioned"));
	else
	{
		riderController.getRequestDetails(req.params.requestID)
		.then(response=>{
			res.json(response);
		})
		.catch(error=>{
			console.log(error);
			res.json(senderror("internal server error"));
		})
	}

})

router.get("/myDeliveries", (req, res)=>{
	
		riderController.getMyDeliveries(req.user.phoneNumber)
		.then(response=>{
			res.json(response);
		})
		.catch(error=>{
			console.log(error);
			res.json(senderror("internal server error"));
		})
})

module.exports = router;
