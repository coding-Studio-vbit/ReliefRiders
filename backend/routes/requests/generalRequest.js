const express = require('express');
const axios = require("axios");
const router = express.Router();
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
        let hashValue = md5(file.originalname + Date.now());
        pathValue = path.join(__dirname, '../../../data/images', hashValue.slice(0, 1), hashValue.slice(0, 2))

        var stat = null;
        try {
            stat = fs.statSync(pathValue);
        } catch (err) {
            fs.mkdirSync(pathValue, { recursive: true });
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
        console.log(file);
        fileName = md5(file.fieldname + String(Date.now()) + file.originalname) + "." + file.mimetype.slice(6);
        return cb(null, fileName)
    }
});

var upload = multer({ storage: storage })


router.post('/new', upload.any('images'), (req, res) => {
    let age;
    const dropLocationCoordinates = JSON.parse(req.body.dropLocationCoordinates);
    const dropLocationAddress = JSON.parse(req.body.dropLocationAddress);
    new Promise((resolve, reject) => {

        if (!dropLocationCoordinates || dropLocationCoordinates.length == 0) {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${dropLocationAddress.area},%20${dropLocationAddress.city}&key=${process.env.GMAPS_API_KEY}`;

            console.log(url);
            axios.get(url)
                .then(response => {
                    const coordinates = response.data.results[0].geometry.location;
                    resolve([coordinates.lng, coordinates.lat]);
                })
                .catch(error => {
                    reject(error);
                    console.log(error);
                })
        }
        else {
            resolve(dropLocationCoordinates);
        }
    })
        .then(roughCoordinates => {
            req.body.roughCoordinates = [roughCoordinates[1], roughCoordinates[0]];
            return requester.findOne({ phoneNumber: req.user.phoneNumber });
        })
        .then(doc => {
            if (doc != null) {
                // lastReqTime = doc.lastRequestTime;
                // console.log(lastRequestTime);
                // return lastRequestTime;
                req.body.requesterId = doc._id;
                 age = new Date().getFullYear() - doc.yearOfBirth;
            }
            return 16273927;
        })
        .then(value => {
            let paths = [];
            // if(Date.now() - value <= process.env.REQUEST_INTERVAL){
            //     throw { status : "failure",message : "Please wait some time to place a new Request "};
            // }
            if (req.files) {
                req.files.map(data => {
                    var path = data.path;
                    var path2 = "data/images";
                    paths.push(path.slice(path.search(path2) + path2.length));
                })
            }
            console.log(paths)
            return paths;
        })
        .then(paths => {
          let urgency = 0
          const itemCategories = JSON.parse(req.body.itemCategories)
          for(let cat = 0 ; cat < itemCategories.length; cat++ ){
            if( itemCategories[cat] === "MEDICINES") {
              urgency = urgency+ parseInt(process.env.MEDICINES_URGENCY)
            }
          }
          if(req.body.requesterCovidStatus === "true")
          {
            urgency =  urgency+ parseInt(process.env.COVID_URGENCY)
          }
        if(age >= 60){
            urgency = urgency+ parseInt(process.env.AGED_URGENCY)
          }
		  
			
			console.log("Urgency is: ", urgency);

			const theDropLocationCoordinates = JSON.parse(req.body.dropLocationCoordinates);
			let tempObject = {
                requesterID: req.body.requesterId,
                requestNumber: Date.now() + Math.floor(Math.random() * 100),
                requesterCovidStatus: req.body.requesterCovidStatus,
                noContactDelivery: req.body.noContactDelivery, // Added no contact delivery
                requestStatus: "PENDING",
                requestType: 'GENERAL',
                paymentPreference : JSON.parse(req.body.paymentPreference),
                itemsListImages: paths,
                itemsListList: JSON.parse(req.body.itemsListList),
                itemCategories: JSON.parse(req.body.itemCategories),
                remarks: req.body.remarks,
                urgency:urgency ,
                dropLocationAddress: JSON.parse(req.body.dropLocationAddress),
				        dropLocationCoordinates: {coordinates: theDropLocationCoordinates},
                roughLocationCoordinates: { coordinates: (req.body.roughCoordinates) }
            };
            let newRequest = new requestModel(tempObject);
			if(theDropLocationCoordinates.length == 0)
			{
				//console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
				newRequest.dropLocationCoordinates = undefined;
			}
			newRequest.pickupLocationCoordinates = undefined;
			console.log(newRequest);
            return newRequest.save()
        })
        .then(result => {
            return res.json({ status: "success", message: "Request successfully made" })
        })
        .catch(err => {
            console.log(err);
            return res.json({ status: "failure", message: err });
        })
})
// --------------------------
module.exports = router;
