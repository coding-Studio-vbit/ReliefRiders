const express = require("express");
const router = express.Router();
const Requester = require("../../models/requesters");

router.post("/registerNewRequester", (req, res) => {
    let requesterData = new Requester({
      name : req.body.name,
      phoneNumber : req.body.phoneNumber,
      yearOfBirth : req.body.yearOfBirth
    });
    if(!req.body.name || !req.body.phoneNumber || !req.body.yearOfBirth)
    {
      res.json({
      status:"failure",
      message: "Name, Phone Number or Year Of Birth not found"
  })
    }else {
    console.log(requesterData);
    requesterData.save()
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

router.get("/allRequesters",  function(req, res, next) {
    Requester.find( function (err, result) {
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
    message: "All Requesters shown",
    result : result
  })
 }
})
})

//export module
module.exports = router;
