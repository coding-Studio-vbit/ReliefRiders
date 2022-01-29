
const express = require("express");
const { sendResponse, sendError } = require("../../controllers/common");
const QuestionsList = require("../../models/question");
const router = express.Router();

router.get("/",async (req,res)=>{
    try {
        const questions = await QuestionsList.findOne({latest:true})
        res.json(sendResponse(questions))
    } catch (error) {
        res.json(sendError("Could not fetch questions"))

    }
})
router.post("/set", async (req,res)=>{
    try {
        const questionsLatest = await QuestionsList.findOne({latest:true})
        if(questionsLatest){
            questionsLatest.latest = false
            await questionsLatest.save()
        }
        const {questions} = req.body
        const questionsList = new QuestionsList({
            questions:(questions),
            latest:true
        })
        await questionsList.save()
        
        res.json(sendResponse("Questions saved "))
    } catch (error) {
        console.log(error);
        res.json(sendError("Could not set questions"))

    }
})
module.exports = router;
