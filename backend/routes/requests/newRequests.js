const express = require('express');
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

    },
    filename: function (req, file, cb) {
        console.log(file);
        fileName = md5(file.fieldname + String(Date.now()) + file.originalname) + "." + file.mimetype.slice(6);
        return cb(null, fileName)
    }
});

var upload = multer({ storage: storage })


router.post('/newRequest/pd', upload.any('images'), (req, res) => {
    let currentReqTime = Date.now();
    console.log(currentReqTime);
    requester.findOne({ phoneNumber: req.user.phoneNumber })
        .then(doc => {
            if (doc != null) {
                //Fetch last request time here
            }
            return 16273927;
        })
        .then(value => {
            let paths = [];

            if (req.files) {
                req.files.map(data => {
                    var path = data.path;
                    var path2 = "data/images";
                    paths.push(path.slice(path.search(path2) + path2.length));
                })
            }
            console.log(paths)
            return paths
        })
        .then(paths => {
            console.log(req.body);
            let newRequest = new requestModel({
                requesterID: requesterId,
                requestNumber: Date.now() + Math.floor(Math.random() * 100),
                requesterCovidStatus: req.body.requesterCovidStatus,
                noContactDelivery: req.body.noContactDelivery, // Added no contact delivery
                requestStatus: req.body.requestStatus,
                requestType: 'P&D',
                itemsListImages: paths,
                itemsListList: JSON.parse(req.body.itemsListList),
                itemCategories: req.body.itemCategories,
                Remarks: req.body.Remarks,
                dropLocationCoordinates: { coordinates: req.body.dropLocationCoordinates },
                dropLocationAddress: req.body.dropLocationAddress,
                pickupLocationCoordinates: { coordinates: req.body.pickupLocationCoordinates },
                pickupLocationAddress: req.body.pickupLocationAddress,

            });
            return newRequest.save()
        })
        .then(result => {
            return res.json({ status: "success", message: "Request successfully made" })
        })
        .catch(err => {
            console.log(err);
            return res.json()
        })
})
// --------------------------
module.exports = router;