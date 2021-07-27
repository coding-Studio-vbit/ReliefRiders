const riders = require("../models/riders");
const { sendError, sendResponse } = require("./common");


async function displayLeaderboard() {
	return new Promise((resolve, reject) => {
		riders.find({},{ name: 1, numberOfDeliveriesCompleted: 1}).sort({numberOfDeliveriesCompleted:-1}).limit(3)
			.then( result => {
				resolve(sendResponse(result));
			})
			.catch(error => {
				console.log(error);
				resolve(sendError("Internal Server Error"));
			})
		})
	}
  module.exports = {
  	displayLeaderboard
  };
