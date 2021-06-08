const express = require("express");
const router = express.Router();
const rider = require("../../models/riders");
const verifyToken = require("../common/tokenAuth");

router.get("/rider/profile", verifyToken,  function(req, res)  {
  rider.findOne({phoneNumber: req.user.phoneNumber},{phoneNumber:1, name: 1, defaultAddress: 1}, function (err, result) {
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
    message: "Rider's profile",
    result : result
  })
 }
})
})


module.exports = router;
