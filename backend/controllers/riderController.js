const riders = require("../models/riders");
const requesters = require("../models/requesters")
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
						return requests.findOne({ requestNumber: requestID }).select(['-pickupLocationCoordinates', '-dropLocationCoordinates']);
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
					return requests.findOne({ _id: riderDoc.currentRequest }).select(['-pickupLocationCoordinates', '-dropLocationCoordinates']);
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
	try {
		const rider = await riders.findOne({ phoneNumber: phoneNumber })
		const request = await requests.findOne({ _id: rider.currentRequest }).select(['-pickupLocationCoordinates', '-dropLocationCoordinates'])
		if (!request) {
			return sendError('No such request found')
		}
		request.requestStatus = "PENDING"
		rider.currentStatus = "AVAILABLE"
		rider.currentRequest = null
		await rider.save()
		await request.save()
		return sendResponse('Delivery cancelled successfully')
	} catch (error) {
		console.log(error);
		return sendError('Internal Server Error')
	}

}

async function getRequestDetails(requestID) {
	return new Promise((resolve, reject) => {
		requests.findOne({ requestNumber: requestID }).select(['-pickupLocationCoordinates', '-dropLocationCoordinates'])
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
				return requests.find({ requestStatus: "DELIVERED", riderID: riderDoc._id }).select(['-pickupLocationCoordinates', '-dropLocationCoordinates'])
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


async function fetchRequests(phoneNumber, longitude, latitude, maxDistance) {
	return new Promise((resolve, reject) => {
		requests.find({
			roughLocationCoordinates: {
				$near: {
					$geometry: { type: "Point", coordinates: [longitude, latitude] },
					$maxDistance: maxDistance
				}
			}, requestStatus: "PENDING"
		}).select(['-pickupLocationCoordinates', '-dropLocationCoordinates'])
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

async function getCurrentRequest(phoneNumber) {

	return new Promise(async (resolve, reject) => {
		riders.findOne({ phoneNumber: phoneNumber })
			.populate('currentRequest')
			.then(async doc => {
				if (!doc)
					resolve(sendError("No such rider found"));
				else {

					if(doc.currentRequest == null)
						return resolve(sendError("No current request found"));
					const requester = await requesters.findOne({ _id: doc.currentRequest.requesterID })
					console.log(requester)
					console.log(doc.currentRequest);
					if (!doc.currentRequest)
						resolve(sendError("No current request found"));
					else {
						const res = doc.currentRequest.toObject();
						res.name = requester.name;
						res.phoneNumber = requester.phoneNumber;
						console.log(res);
						resolve(sendResponse(res));
					}
				}
			})
			.catch(error => {
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
