const requests = require("../models/request")
const requesters = require("../models/requesters")
const { sendError, sendResponse } = require("./common")

const searchByRequestNumber = async(requestNumber)=> {
    try {

        const request = await requests.findOne({ requestNumber: requestNumber }).populate('requesterID')
        return sendResponse(request)

    } catch (error) {
        console.log(error)
        return sendError('Internal Server Error')
    }

}
module.exports = {
    searchByRequestNumber
}