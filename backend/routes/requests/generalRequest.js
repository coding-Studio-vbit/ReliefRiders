const express = require('express');
const router  = express.Router();
const dotenv = require('dotenv');
const requestModel = require('../../models/request');
const requester = require('../../models/requesters')
var md5 = require('md5');
const multer = require("multer");
var md5 = require('md5');
const fs = require('fs')
const path = require('path');
const verifyToken = require('../common/tokenAuth');
//const mongoose  = require('mongoose');
//const cors = require('cors');
//app.use(cors())
//app.use(express.json())
router.use(verifyToken);

dotenv.config()


//multer storage

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let hashValue = md5(file.originalname+Date.now());
        pathValue = path.join('data\images',hashValue.slice(0,1),hashValue.slice(0,2))
        if (fs.existsSync(pathValue)) {
            cb(null, (pathValue))
          }
        else{
            fs.mkdir(pathValue,{ recursive: true },(err)=>{
                if (err) { console.log('Path Error! Folder cannot be created.')}
                else{
                    cb(null, (pathValue))
                }
            })
        }
    },
    filename: function (req, file, cb) {
        fileName = file.fieldname+Date.now() + file.originalname
        cb(null, fileName)
    }
});

var upload = multer({ storage: storage })


router.post('/requests/newRequest/general',upload.any('images'),(req,res)=>{
    let currentReqTime = Date.now();
    requester.findOne({req.user.phoneNumber})
    .then(doc => {
        if(doc != null)
        {
            lastReqTime = doc.lastRequestTime
        }
    })
    .catch(err => {
        console.log('Could Not find Previous request time')
    })

    if (currentReqTime-lastReqTime <= process.env.REQUEST_INTERVAL){
        return res.json({status: "failure", message: "Request cannot be placed"})
    }
    //getting array of paths for all the saved files. This was simpler than storing paths
    let paths = [];
    try{
        req.files.map(data=>{
            paths.push(data.path)
        })
    }
    catch(err){
        console.log("Two things could've happened 1.)You did not Upload files, 2.) Paths cannot be fetched!")
    }

    let newRequest = new requestModel({
        requestNumber : Date.now() + Math.floor(Math.random()*100),
        requesterCovidStatus : req.body.requesterCovidStatus,
        lastRequestTime : currentReqTime,
        noContactDelivery : req.body.noContactDelivery, // added no contact delivery
        requestStatus : req.body.requestStatus,
        requestType : 'GENERAL',
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
        return res.json({status:"success", message: "Request successfully made"})
    })
    .catch(err =>{
        return res.json({status:"failure",message:"Sorry!request could not be placed"})
    })
    
    
    
})
// --------------------------
module.exports = router;
