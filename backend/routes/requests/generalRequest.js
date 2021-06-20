const express = require('express');
const router  = express.Router();
const mongoose  = require('mongoose');
const dotenv = require('dotenv');
const requestModel = require('../../models/request');
const cors = require('cors');
var md5 = require('md5');
const multer = require("multer");
var md5 = require('md5');
const fs = require('fs')
const path = require('path');
const verifyToken = require('../common/tokenAuth');
//app.use(cors())
//app.use(express.json())
router.use(verifyToken);

dotenv.config()


//multer storage
var paths = [];
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let hashVal = md5(file.originalname+Date.now());
        pathVal = path.join('data\images',hashVal.slice(0,1),hashVal.slice(0,2))
        if (fs.existsSync(pathVal)) {
            cb(null, (pathVal))
          }
        else{
            fs.mkdir(pathVal,{ recursive: true },(err)=>{
                if (err) { console.log('asshat')}
                else{
                    cb(null, (pathVal))
                }
            })
        }
    },
    filename: function (req, file, cb) {
        fileName = file.fieldname+Date.now() + file.originalname
        cb(null, fileName)
        paths.push(path.join(pathVal,fileName))
        console.log(paths)
    }
});

var upload = multer({ storage: storage })


var pastReqTime = 0
router.post('/requests/newRequest/general',upload.any('images'),(req,res)=>{
    newReqSetTime = Date.now()
    if (newReqSetTime-pastReqTime <= 2000){
        return res.json({status: "failure", message: "Request cannot be placed"})
    }
    let newRequest = new requestModel({
        requestNumber : Date.now() + Math.floor(Math.random()*100),
        requesterCovidStatus : req.body.requesterCovidStatus,
        requestStatus : req.body.requestStatus,
        requestType : req.body.requestType,//change 
        itemsListList: req.body.itemsListList,
        itemCategories : req.body.itemCategories,
        Remarks: req.body.Remarks,
        billsImageList : paths,
        rideImages: req.body.rideImages,
        pickupLocationCoordinates: req.body.pickupLocationCoordinates,
	    pickupLocationAddress: req.body.pickupLocationAddress,
        dropLocationCoordinates: req.body.dropLocationCoordinates,
        dropLocationAddress: req.body.dropLocationAddress
    }); //have to add no-contact-delivery (true/false)
    newRequest.save()
    .then(result =>{
        return res.json({status:"success", message: "Request successfully made"})
    })
    .catch(err =>{
        return res.json({status:"failure",message:"Sorry!request could not be placed"})
    })
    
    
    
})