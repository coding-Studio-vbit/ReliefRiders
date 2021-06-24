const express = require('express');
const router  = express.Router();
const requestModel = require('../../models/request');
const requester = require('../../models/requesters')
const multer = require("multer");
const md5 = require('md5');
const fs = require('fs');
const path = require('path');
const verifyToken = require('../common/tokenAuth');

router.use(verifyToken);



//multer storage

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let hashValue = md5(file.originalname+Date.now());
        pathValue = path.join(__dirname, '../../../data/images', hashValue.slice(0,1),hashValue.slice(0,2))

        var stat = null;
        try {
            stat = fs.statSync(pathValue);
        } catch (err) {
				fs.mkdirSync(pathValue, {recursive: true});
        }
        if (stat && !stat.isDirectory()) {
            throw new Error('Directory cannot be created because an inode of a different type exists at "' + pathValue + '"');
        }       
        cb(null, pathValue);
      //  if (fs.existsSync(pathValue)) {
      //      cb(null, (pathValue))
      //    }
      //  else{
      //      fs.mkdir(pathValue,{ recursive: true },(err)=>{
      //          if (err) { console.log('Path Error! Folder cannot be created.')}
      //          else{
      //              cb(null, (pathValue))
      //          }
      //      })
      //  }
    },
    filename: function (req, file, cb) {
        fileName = md5(file.fieldname + String(Date.now()) + file.originalname);
        return cb(null, fileName)
    }
});

var upload = multer({ storage: storage })


router.post('/newRequest/general',upload.any('images'),(req,res)=>{
    let currentReqTime = Date.now();
    console.log(currentReqTime);
    requester.findOne({phoneNumber : req.user.phoneNumber})
    .then(doc => {
        if(doc != null)
        {
            // lastReqTime = doc.lastRequestTime;
            // console.log(lastRequestTime);
            // return lastRequestTime;
            
        }
        return 16273927;
    })
    .then(value =>{
        let paths = [];
        // if(currentReqTime - value <= process.env.REQUEST_INTERVAL){
        //     throw { status : "failure",message : "Please wait some time to place a new Request "};
        // }
        if (req.files){
            req.files.map(data=>{
                paths.push(data.path)
            })
        }
        console.log(paths)
        return paths 
    })
    .then(paths =>{
        console.log(req.body);
        let newRequest = new requestModel({
            requestNumber : Date.now() + Math.floor(Math.random()*100),
            requesterCovidStatus : req.body.requesterCovidStatus,
            noContactDelivery : req.body.noContactDelivery, // Added no contact delivery
            requestStatus : req.body.requestStatus,
            requestType : 'GENERAL',
            itemsListImages : paths,
            itemsListList : JSON.parse(req.body.itemsListList),
            itemCategories : JSON.parse(req.body.itemCategories),
            Remarks: req.body.Remarks,
            dropLocationCoordinates: JSON.parse(req.body.dropLocationCoordinates),
            dropLocationAddress: JSON.parse(req.body.dropLocationAddress)
        }); 
        //console.log("YAY!")
        return newRequest.save()    
    })
    .then(result =>{
        return res.json({status:"success", message: "Request successfully made"})
    })
    .catch(err =>{
            return res.json(err)
    })    
})
// --------------------------
module.exports = router;
