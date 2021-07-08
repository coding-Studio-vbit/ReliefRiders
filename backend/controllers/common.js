function sendError(message)
{
	return {
		status: "failure",
		message: message
	}
}

function sendResponse(message)
{
	return {
		status: "success",
		message: message
	}
}
module.exports = {
	sendResponse,
	sendError
}
