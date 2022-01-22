const Feedback = require("../models/feedback");
const QuestionsList = require("../models/question");
const Question = require("../models/question");
const requesters = require("../models/requesters");
const { sendResponse, sendError } = require("./common");

async function saveFeedback(req,res){
    try {
        const {questionsID, answers,userID } = req.body
        const requester = await requesters.findById(userID)
        const questions = await QuestionsList.findById(questionsID)
        const feed = new Feedback({
            userID:requester,
            response:(answers),
            questionsID:questions
        })
        await feed.save()
        res.json(sendResponse("Feedback received"))
    } catch (error) {
        console.log(error);
        res.json(sendError("Feedback not saved"))

    }
}

module.exports = {
    saveFeedback
};
