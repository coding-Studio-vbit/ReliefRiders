const express = require("express");
const router = express.Router();
const requester = require("../../models/requesters");


router.post("/requester/profile",  function(req, res, next) {
  let phone = req.body.phone;
    requester.findOne({phoneNumber: phone},{phoneNumber:1, name: 1, defaultAddress: 1, yearOfBirth: 1}, function (err, result) {
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
 // console.log(result);
 }
})
})


module.exports = router;
