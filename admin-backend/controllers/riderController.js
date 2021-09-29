const riders = require("../models/riders");
const requests = require("../models/request")
const { sendError, sendResponse } = require("./common");

async function riderByName(name) {
    try {

        const riderAvailable = await riders.find({ name: { $regex: name }, currentStatus: "AVAILABLE" }, { name: 1 }).exec()
        return sendResponse(riderAvailable)

    } catch (error) {
        console.log(error)
        return sendError('Internal Server Error')
    }
}

async function assignRider(phoneNumber, requestNumber) {
    try {

        const rider = await riders.findOne({ phoneNumber: phoneNumber })
        const request = await requests.findOne({ requestNumber: requestNumber })
        rider.currentStatus = "BUSY"
        rider.currentRequest = request._id
        rider.currentRequestType = request.requestType
        request.requestStatus = "UNDER DELIVERY"
        request.riderID = rider._id
        await rider.save();
        await request.save();
        return sendResponse(`Request assigned to ${rider.name} successfully`)

    } catch (error) {
        console.log(error)
        return sendError('Internal Server Error')
    }
}

async function getDeliveries() {
    try {

        const getDeliveries = await requests.find().exec()
        return sendResponse(getDeliveries)

    } catch (error) {
        console.log(error)
        return sendError('Internal Server Error')
    }
}

async function getDeliveriesByRequestStatus() {
    try {

        const getDeliveries = await requests.find({ requestStatus: requestStatus }).exec()
        return sendResponse(getDeliveries)

    } catch (error) {
        console.log(error)
        return sendError('Internal Server Error')
    }
}




async function searchDeliveryByRiderName(name) {
    try {

        const deliveriesByName = await riders.find({ name: { $regex: name } }).exec()
        return sendResponse(deliveriesByName)

    } catch (error) {
        console.log(error)
        return sendError('Internal Server Error')
    }
}

module.exports = {
    riderByName,
    assignRider,
    getDeliveries,
    searchDeliveryByRiderName,
    getDeliveriesByRequestStatus

}