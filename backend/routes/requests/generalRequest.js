const express = require('express');
const router = express.Router();
const imageController = require('../../controllers/imageController');
const requestsController = require('../../controllers/requestsController');
const verifyToken = require('../common/tokenAuth');
const { sendError, sendResponse } = require('../../controllers/common');


router.use(verifyToken);


router.post('/new', imageController.upload.any('images'), (req, res) => {
    requestsController.generalRequest(req.body,req.files,req.user)
    .then(response=>{
        res.json(response);
    })
<<<<<<< HEAD
    .catch(error=>{
        console.log(error);
		res.json(sendError("Internal Server Error"));
    })   
=======
        .then(roughCoordinates => {
            req.body.roughCoordinates = roughCoordinates;
            return requester.findOne({ phoneNumber: req.user.phoneNumber });
        })
        .then(doc => {
            if (doc != null) {
                // lastReqTime = doc.lastRequestTime;
                // console.log(lastRequestTime);
                // return lastRequestTime;
                req.body.requesterId = doc._id;
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

            let newRequest = new requestModel({
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
                dropLocationCoordinates: { coordinates: JSON.parse(req.body.dropLocationCoordinates) },
                dropLocationAddress: JSON.parse(req.body.dropLocationAddress),
                roughLocationCoordinates: { coordinates: (req.body.roughCoordinates) }
            });
            return newRequest.save()
        })
        .then(result => {
            return res.json({ status: "success", message: "Request successfully made" })
        })
        .catch(err => {
            console.log(err);
            return res.json({ status: "failure", message: err });
        })
>>>>>>> d98ed45b17101e28073d1996fc4ad16f51829944
})
// --------------------------
module.exports = router;
