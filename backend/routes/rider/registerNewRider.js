const express = require("express");
const router = express.Router();
const Rider = require("../../models/riders");

router.post("/registerNewRider", (req, res) => {
  let riderData = new Rider({
    name : req.body.name,
    phoneNumber : req.body.phoneNumber
  });
  if(!req.body.name || !req.body.phoneNumber)
  {
    res.json({
    status:"failure",
    message: "Name or Phone Number not found"
})
  }else {
  console.log(riderData);
  riderData.save()
      .then(item => {
        res.json({
          status:"success",
          message: "New Rider added"
        })
      })
      .catch(err => {
        res.json({
          status:"failure",
          message: "Unable to add to database"
        })
        console.log(err);
      })
    }
})

router.get("/allRiders", (req,res) => {
  riders.find({}, (err, riderData) => {
    if(err){
      console.log(error);
    }else{
      console.log(riderData);
    }
  })
})

//export module
  module.exports = router;
