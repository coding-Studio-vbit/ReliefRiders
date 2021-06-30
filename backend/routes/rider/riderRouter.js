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
		requests.findOne({requestID: requestID})
		.then(doc=>{
					
			})
})
module.exports = router;

