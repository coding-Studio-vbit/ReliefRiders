const riders = require("../models/riders");
const requests = require("../models/request")
const { sendResponse, sendError } = require("./common");

async function getRiderProfile(phoneNumber) {
	return new Promise((resolve, reject) => {

		riders.findOne({ phoneNumber: phoneNumber }, { phoneNumber: 1, name: 1, defaultAddress: 1 })
			.then((doc) => {
				resolve(sendResponse(doc));
			})
			.catch(error => {
				console.log(error);
				resolve(sendError("Internal Server Error"));
			})
	})
}

async function updateRiderProfile(phoneNumber, newName) {
	return new Promise((resolve, reject) => {
		riders.findOneAndUpdate({ phoneNumber: phoneNumber }, { $set: { name: newName } }, { new: true }, function (err, doc) {
			if (err) {
				resolve(sendError("Unable to retrieve data, Internal Server Error"));
				console.error(err);
			}
			else {
				resolve(sendResponse("Rider's profile updated"));
			}
		})
	})
}

async function makeDelivery(phoneNumber, requestID) {
	return new Promise((resolve, reject) => {

		let riderDoc;
		riders.findOne({ phoneNumber: phoneNumber })
			.then(doc => {
				if (!doc)
					resolve(sendError("Rider not found"));
				else {
					riderID = doc._id;
					riderDoc = doc;
					if (doc.currentStatus != "AVAILABLE")
						resolve(sendError(`Rider status is ${doc.currentStatus}, cannot assign this request to rider`));

					else
						return requests.findOne({ requestNumber: requestID });
				}
			})
			.then(doc => {
				if (!doc)
					resolve(sendError("No such request found"));

				else if (doc.requestStatus != "PENDING")
					resolve(sendError("Request status is not PENDING, you cannot take up this request"));
				else {
					//update request status
					doc.requestStatus = "UNDER DELIVERY";
					doc.riderID = riderID;
					//update rider status
					riderDoc.currentRequest = doc._id;
					riderDoc.currentRequestType = doc.requestType;
					riderDoc.currentStatus = "BUSY";
					return doc.save();
				}
			})
			.then(() => {
				return riderDoc.save();
			})
			.then(() => {
				resolve(sendResponse("Make Delivery confirmed"));
			})
			.catch(error => {
				console.log(error);
				resolve(sendError("Internal Server Error"));
			})
	})
}


async function finishDelivery(phoneNumber, fileData) {
	return new Promise((resolve, reject) => {
		let billsImagePaths = [];
		let rideImagePaths = [];
		if (fileData) {
			for (var key in fileData) {
				fileData[key].map(data => {
					var path = data.path;
					var path2 = "data/images";
					if (value.fieldname === 'billsImages') {
						billsImagePaths.push(path.slice(path.search(path2) + path2.length));
					}
					else {
						rideImagePaths.push(path.slice(path.search(path2) + path2.length));
					}
				})
			}
		}
		riders.findOne({ phoneNumber: phoneNumber })
			.then((doc) => {
				if (!doc)
					resolve(sendError("No such rider found!"));
				else if (doc.currentStatus != "BUSY")
					resolve(sendError("Rider is not BUSY, cannot finish delivery!"));
				else {
					riderDoc = doc;
					return requests.findOne({ requestID: riderDoc.currentRequest });
				}
			})
			.then((doc) => {
				if (!doc)
					resolve(sendError("Cannot find the request to be finished"));
				else {
					requestDoc = doc;
					requestDoc.requestStatus = "CONFIRMED BY RIDER";
					requestDoc.billsImageList = billsImagePaths;
					requestDoc.rideImages = rideImagePaths;
					riderDoc.currentStatus = "AVAILABLE";
					riderDoc.currentRequest = null;
					return requestDoc.save();
				}
			})
			.then(() => {
				return riderDoc.save();
			})
			.then(() => {
				resolve("Finish Delivery Successful");
			})
			.catch(error => {
				console.log(error);
				resolve(sendError("Internal Server Error"));
			})
	})
}

async function cancelDelivery(phoneNumber) {
	return new Promise((resolve, reject) => {

		let riderDoc;

		riders.findOne({ phoneNumber: phoneNumber })
			.then((doc) => {
				if (!doc)
					resolve(sendError("No such rider found"));
				else if (doc.currentStatus != "BUSY")
					resolve(sendError("Rider is not BUSY, cannot cancel delivery"))
				else {
					riderDoc = doc;
					return requests.findOne({ _id: riderDoc.currentRequest });
				}
			})
			.then((doc) => {
				if (!doc)
					resolve(sendError("Cannot find the request to be cancelled"));
				else {
					requestDoc = doc;
					requestDoc.requestStatus = "PENDING";
					riderDoc.currentStatus = "AVAILABLE";
					riderDoc.currentRequest = null;
					return requestDoc.save();
				}
			})
			.then(() => {
				return riderDoc.save();
			})
			.then(() => {
				resolve(sendResponse("Cancel Delivery Successful"));
			})
			.catch(error => {
				console.log(error);
				return res.json(error);
			})
	})
}

async function getRequestDetails(requestID) {
	return new Promise((resolve, reject) => {
		requests.findOne({ requestNumber: requestID })
			.populate('requesterID')
			.then((temp) => {
				if (!temp) {
					resolve(sendError("No such request found!"));
				}
				else {
					let doc = temp.toObject();
					const requesterPhone = temp.requesterID.phoneNumber;
					doc.requesterID = undefined;
					doc.requesterPhoneNumber = requesterPhone;
					if (!doc)
						resolve(sendError("No such request found!"));
					else
						resolve(sendResponse(doc));
				}

			})
			.catch(error => {
				console.log(error);
				resolve(sendError("Internal Server Error"));
			})
	})
}

async function getMyDeliveries(phoneNumber) {
	return new Promise((resolve, reject) => {

		riders.findOne({ phoneNumber: phoneNumber })
			.then((riderDoc) => {
				return requests.find({ requestStatus: "DELIVERED", riderID: riderDoc._id })
			})
			.then(docs => {
				resolve(sendResponse(docs));
			})
			.catch(error => {
				console.log(error);
				resolve(sendError("Internal Server Error"));
			})
	})
}


async function fetchRequests(phoneNumber,longitude,latitude,maxDistance) {
	return new Promise((resolve, reject) => {
		requests.find({roughLocationCoordinates:{ $near: { $geometry:{ type: "Point",  coordinates: [longitude, latitude] },
				$maxDistance: maxDistance
			}}, requestStatus : "PENDING"})
			.then((doc) => {
				resolve(sendResponse(doc));
			//	console.log(doc.length)
			})
			.catch(error => {
				console.log(error);
				resolve(sendError("Internal Server Error"));
			})
		})
	}

async function getCurrentRequest(phoneNumber){

	return new Promise((resolve, reject)=>{
		riders.findOne({phoneNumber: phoneNumber})
		.populate('currentRequest')
		.then(doc=>{
			if(!doc)
				resolve(sendError("No such rider found"));
			else
			{
				console.log(doc.currentRequest);
				if(!doc.currentRequest)
					resolve(sendError("No current request"));
				else
					resolve(sendResponse(doc.currentRequest));
			}
		})
		.catch(error=>{
			console.log(error);
			resolve(sendError("Internal Server Error"));
		})

	})
}

module.exports = {
	getRiderProfile,
	updateRiderProfile,
	makeDelivery,
	finishDelivery,
	cancelDelivery,
	getRequestDetails,
	getMyDeliveries,
	getCurrentRequest,
	fetchRequests
};
