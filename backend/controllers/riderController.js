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

		riders.firesultndOne({ phoneNumber: phoneNumber })
			.then(doc => {
				if (!doc)
					resolve(sendError("Rider not found"));
				else {
					riderID = doc._id;
					riderDoc = doc;
					if (doc.currentStatus != "AVAILABLE")
						resolve(sendError("Rider status is invalid, cannot assign this request to rider"));

					else
						return requests.findOne({ requestID: requestID });
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
					riderDoc.currentRequest = doc.requestID;
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

async function finishDelivery(phoneNumber) {
	return new Promise((resolve, reject) => {

		let riderDoc;
		riders.findOne({ phoneNumber: phoneNumber })
			.then((doc) => {
				if (!doc)
					resolve(sendError("No such rider found!"));
				else if (doc.currentStatus != "BUSY")
					resolve(sendError("Rider is not BUSY, cannot finish delivery!"));
				else {
					riderDoc = doc;
					return request.findOne({ requestID: riderDoc.currentRequest });
				}
			})
			.then((doc) => {
				if (!doc)
					resolve(sendError("Cannot find the request to be finished"));
				else {
					requestDoc = doc;
					requestDoc.requestStatus = "CONFIRMED BY RIDER";
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
					return request.findOne({ requestID: riderDoc.currentRequest });
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
				let doc = temp.toObject();
				const requesterPhone = temp.requesterID.phoneNumber;
				doc.requesterID = undefined;
				doc.requesterPhoneNumber = requesterPhone;
				if (!doc)
					resolve(sendError("No such request found!"));
				else
					resolve(sendResponse(doc));
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
				return request.find({ requestStatus: "DELIVERED", riderID: riderDoc._id })
			})
			.then(docs => {
				resolve(sendResponse(docs.data.rows));
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
	getMyDeliveries
};
