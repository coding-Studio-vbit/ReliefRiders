
const express = require("express");
const { saveFeedback } = require("../../controllers/feedbackController");
const router = express.Router();

router.post("/", saveFeedback)

module.exports = router;
