const requests = require("../models/request");
const requester = require("../models/requesters");
const { sendResponse, sendError } = require('./common');
const axios = require("axios");

async function generalRequest(formData,fileData,userData){
        return new Promise((resolve,reject)=>{
            const dropLocationCoordinates = JSON.parse(formData.dropLocationCoordinates);
            const dropLocationAddress = JSON.parse(formData.dropLocationAddress);
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
                    formData.roughCoordinates = roughCoordinates;
                    return requester.findOne({ phoneNumber: userData.phoneNumber });
            })
            .then(doc => {
                if (doc != null) {
                    // lastReqTime = doc.lastRequestTime;
                    // console.log(lastRequestTime);
                    // return lastRequestTime;
                    formData.requesterId = doc._id;
                }
                else{
                    resolve(sendError("No such requester found"));
                }
                return 16273927;
            })
            .then(value => {
                let paths = [];
                if (fileData) {
                    fileData.map(data => {
                        var path = data.path;
                        var path2 = "data/images";
                        paths.push(path.slice(path.search(path2) + path2.length));
                    })
                }
                console.log(paths)
                return paths;
                })
                .then(paths => {
                    let newRequest = new requests({
                        requesterID: formData.requesterID,
                        requestNumber: Date.now() + Math.floor(Math.random() * 100),
                        requesterCovidStatus: formData.requesterCovidStatus,
                        noContactDelivery: formData.noContactDelivery, 
                        requestStatus: "PENDING",
                        requestType: 'GENERAL',
                        paymentPreference : JSON.parse(formData.paymentPreference),
                        itemsListImages: paths,
                        itemsListList: JSON.parse(formData.itemsListList),
                        itemCategories: JSON.parse(formData.itemCategories),
                        remarks: formData.remarks,
                        dropLocationCoordinates: { coordinates: JSON.parse(formData.dropLocationCoordinates) },
                        dropLocationAddress: JSON.parse(formData.dropLocationAddress),
                        roughLocationCoordinates: { coordinates: (formData.roughCoordinates) }
                    });
                    return newRequest.save()
                })
                .then(result => {
                    resolve(sendResponse( "Request successfully made"));
                    
                })
                .catch(err => {
                    console.log(err);
                    resolve(sendError("Internal Server Error"));
                })
        })
    }


async function pdRequest(formData,fileData,userData){
        return new Promise((resolve,reject)=>{
            const pickupLocationCoordinates = JSON.parse(formData.pickupLocationCoordinates);
            const pickupLocationAddress = JSON.parse(formData.pickupLocationAddress);
            new Promise((resolve, reject) => {
                if (!pickupLocationCoordinates || pickupLocationCoordinates.length == 0) {
                    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${pickupLocationAddress.area},%20${pickupLocationAddress.city}&key=${process.env.GMAPS_API_KEY}`;
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
                    resolve(pickupLocationCoordinates);
                }
            })
        .then(roughCoordinates => {
            formData.roughCoordinates = roughCoordinates;
            return requester.findOne({ phoneNumber: userData.phoneNumber });
        })
        .then(doc => {
            if (doc != null) {
                //Fetch last request time here
                formData.requesterID = doc._id;
            }
            else {
                resolve(sendError("No such Requester found!"));
            }
            return 16273927;
        })
        .then(value => {
            let paths = [];
            if (fileData) {
                fileData.map(data => {
                    var path = data.path;
                    var path2 = "data/images";
                    paths.push(path.slice(path.search(path2) + path2.length));
                })
            }
            console.log(paths)
            return paths
        })
        .then(paths => {
            console.log(formData);
            let newRequest = new requests({
                requesterID: formData.requesterID,
                requestNumber: Date.now() + Math.floor(Math.random() * 100),
                requesterCovidStatus: formData.requesterCovidStatus,
                noContactDelivery: formData.noContactDelivery, // Added no contact delivery
                requestStatus: "PENDING",
                requestType: 'P&D',
                itemsListImages: paths,
                itemsListList: JSON.parse(formData.itemsListList),
                itemCategories: JSON.parse(formData.itemCategories),
                remarks: formData.remarks,
                dropLocationCoordinates: { coordinates: JSON.parse(formData.dropLocationCoordinates) },
                dropLocationAddress: JSON.parse(formData.dropLocationAddress),
                pickupLocationCoordinates: { coordinates: JSON.parse(formData.pickupLocationCoordinates) },
                pickupLocationAddress: JSON.parse(formData.pickupLocationAddress),
                roughLocationCoordinates: { coordinates: formData.roughCoordinates }
            });
            return newRequest.save()
        })
        .then(result => {
            resolve(sendResponse("Request successfully made"));
        })
        .catch(err => {
            console.log(err);
            resolve(sendError("An Error occured"));
        })
            
    })
}

module.exports = {
	generalRequest,
    pdRequest
};