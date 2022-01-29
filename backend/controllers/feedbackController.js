const Feedback = require("../models/feedback");
const QuestionsList = require("../models/question");
const Question = require("../models/question");
const requesters = require("../models/requesters");
const { sendResponse, sendError } = require("./common");

async function saveFeedback(req,res){
    try {
        const {questionsID, answers,optionalFeedback} = req.body
        const requester = await requesters.findOne({phoneNumber:req.user.phoneNumber});
        const questions = await QuestionsList.findById(questionsID)
        const feed = new Feedback({
            userID:requester,
            response:(answers),
            questionsID:questions,
            optionalFeedback:optionalFeedback
        })
        console.log(feed);
        await feed.save()
        res.json(sendResponse("Feedback Submitted Successfully"))
    } catch (error) {
        console.log(error);
        res.json(sendError("Failed to submit feedback"))

    }
}

module.exports = {
    saveFeedback
};
