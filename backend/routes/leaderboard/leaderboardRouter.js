const express = require("express");
const router = express.Router();
const tokenAuth = require("../common/tokenAuth");
const {sendError, sendResponse} = require("../../controllers/common");
const leaderboardController = require("../../controllers/leaderboardController");

router.get("/showLeaderboard", (req, res)=>{
		leaderboardController.displayLeaderboard()
		.then(response=>{
			res.json(response);
		})
		.catch(error=>{
			console.log(error);
			res.json(senderror("internal server error"));
		})
})

module.exports = router;
