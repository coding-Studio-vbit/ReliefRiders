const express = require("express");
const router = express.Router();
const requester = require("../../models/requesters");
const verifyToken = require("../common/tokenAuth");


router.get("/requester/profile", verifyToken,  function(req, res)  {
  requester.findOne({phoneNumber: req.user.phoneNumber},{phoneNumber:1, name: 1, defaultAddress: 1, yearOfBirth: 1}, function (err, result) {
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
    message: "Requesters profile",
    result : result
  })
 }
})
})


module.exports = router;
