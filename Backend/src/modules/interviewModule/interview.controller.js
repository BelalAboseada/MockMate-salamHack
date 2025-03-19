import { StatusCodes } from "http-status-codes";
import axios from "axios";
import { interviewModel } from "../../DB/models/interview.model.js";
import { generateQuestionsFromAi } from "../../utils/AI/generateQuestions.js";

export const generateQuestions = async (req, res, next) => {
    const { position, experience_years, note, degree } = req.body;

    const {questions} = await generateQuestionsFromAi(position , note , experience_years , degree ,next)
    console.log(questions);
        const interview = await interviewModel.create({
            experience_years  , position , degree , interviewQA :questions , userId : req.user._id
        })
        return res.status(StatusCodes.ACCEPTED).json({interview})
};

export const submitAnswers = async(req , res , next)=>{
    const {answers} = req.body;
    const {interviewId} = req.params
    const interview = await interviewModel.findById(interviewId);
    if(!interview) 
        return next(new Error('interview not found' , {cause : StatusCodes.NOT_FOUND}));
    if(req.user._id.toString()!==interview.userId.toString())
        return next(new Error('you are not allowed to answer this questions' , {cause:StatusCodes.BAD_REQUEST}));
    const QA = interview.interviewQA ;
    for (const answer of answers) {
        QA.map(e =>  {
            if(e._id.toString() === answer.questionId.toString())
                {
                e.answer = answer.answer
                }
            })
    }
    
    interview.interviewQA = QA;
    await interview.save()
    return res.status(StatusCodes.ACCEPTED).json({success:true , interview})
}


export const getAllInterviews = async(req , res , next)=>{
    const interviews = await interviewModel.find({
        userId : req.user._id,
        isCompleted : true
    });
    if(!interviews.length) 
        return next(new Error('interviews not found' , {cause : StatusCodes.NOT_FOUND}));
    return res.status(StatusCodes.ACCEPTED).json({success:true , interviews})
}


export const getInterviewResult = async (req, res, next) => {
    const { interviewId } = req.params;

        const interview = await interviewModel.findById(interviewId);
        
        if (!interview) {
            return next(new Error('Interview not found', { cause: StatusCodes.NOT_FOUND }));
        }

        if (req.user._id.toString() !== interview.userId.toString()) {
            return next(new Error('You are not allowed to see this interview', { cause: StatusCodes.BAD_REQUEST }));
        }
        const interviewQA = interview.interviewQA
        const interview_data = interviewQA.map(e=> e={
            question : e.question ,answer : e.answer ,number :  e.number
        })
        try{
        const flaskServerUrl = "http://127.0.0.1:5001/analyze-answers";
        const requestData =  interview_data ; 
        const response = await axios.post(flaskServerUrl, requestData);
        
        const {scores , total_score ,report } = response.data;
        console.log({scores , total_score , report});
        
        interviewQA.forEach(e => {
            const scoreData = scores.find(s => s.number === e.number);
            if (scoreData) {
                Object.assign(e, scoreData); // تحديث القيم بدل إنشاء كائن جديد
            }
        });
        interview.interviewQA = interviewQA;
        interview.total_score = total_score;
        interview.report = report;
        interview.isCompleted = true;
        await interview.save()
        res.status(StatusCodes.OK).json({ success: true  , interview});
        }
    catch (error) {
        if (error.response) {
            return next(new Error(`Flask server error: ${error.response.data.error}`, { cause: StatusCodes.INTERNAL_SERVER_ERROR }));
        }
        return next(new Error("Failed to fetch analysis from Flask server", { cause: StatusCodes.INTERNAL_SERVER_ERROR }));
}};