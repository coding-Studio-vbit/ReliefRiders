const express = require("express");
const router = express.Router();
const Rider = require("../../models/requesters");

router.post("/registerNewRequester", (req, res) => {
    let riderData = new Rider({
      name : req.body.name,
      phoneNumber : req.body.phoneNumber,
      dateOfBirth : req.aborted.dateOfBirth
    });
    if(!req.body.name || !req.body.phoneNumber || !req.body.dateOfBirth)
    {
      res.json({
      status:"failure",
      message: "Name, Phone Number or DateOfBirth not found"
  })
    }else {
    console.log(riderData);
    riderData.save()
        .then(item => {
          res.json({
            status:"success",
            message: "New Requester added"
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

router.get("/allRequesters", (req,res) => {
    riders.find({}, (err, requesterData) => {
        if(err){
            console.log(error);
        }else{
            console.log(requesterData);
        }
    })
})
  
//export module
module.exports = router;