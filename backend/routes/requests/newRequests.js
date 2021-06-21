const express = require('express');
const router  = express.Router();
const dotenv = require('dotenv');
const requestModel = require('../../models/request');
const verifyToken = require('../common/tokenAuth');
//dependencies and packages (multer, cors)
const multer = require("multer");
var md5 = require('md5');
const fs = require('fs')
const path = require('path');

router.use(verifyToken);

dotenv.config()


//Storing files in the server using Multer
var paths = [];
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let hashValue = md5(file.originalname+Date.now());
        pathValue = path.join('data\images',hashValue.slice(0,1),hashValue.slice(0,2))
        if (fs.existsSync(pathValue)) {
            cb(null, (pathValue))
          }
        else{
            fs.mkdir(pathValue,{ recursive: true },(err)=>{
                if (err) { console.log('Cannot store files! Path Error!')}
                else{
                    cb(null, (pathValue))
                }
            })
        }
    },
    filename: function (req, file, cb) {
        fileName = file.fieldname+Date.now() + file.originalname
        cb(null, fileName)
        paths.push(path.join(pathValue,fileName))
        console.log(paths)
    }
});

var upload = multer({ storage: storage })


var pastReqTime = 0
router.post('/requests/newRequest/pd',upload.any('images'),(req,res)=>{
    let newReqSetTime = Date.now()
    if (newReqSetTime-pastReqTime <= process.env.REQUEST_INTERVAL){
        return res.json({status: "failure", message: "Files failed to be uploaded"})
    }
    let newRequest = new requestModel({
        requestNumber : Date.now() + Math.floor(Math.random()*100),
        requesterCovidStatus : req.body.requesterCovidStatus,
        requestStatus : req.body.requestStatus,
        itemsListList: req.body.itemsListList,
        itemCategories : req.body.itemCategories,
        Remarks: req.body.Remarks,
        billsImageList : paths,
        rideImages: req.body.rideImages,
        pickupLocationCoordinates: req.body.pickupLocationCoordinates,
	    pickupLocationAddress: req.body.pickupLocationAddress,
        dropLocationCoordinates: req.body.dropLocationCoordinates,
        dropLocationAddress: req.body.dropLocationAddress
    }); 
    newRequest.save()
    .then(result =>{
        return res.json({status:"success!", message: "Request accepted successfully"})
    })
    .catch(err =>{
        return res.json({status:"failure!",message:"Sorry! Request could not be accepted"})
    })

    pastReqTime = newReqSetTime;
    
    
    
})
module.exports = router;