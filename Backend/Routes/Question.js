const express = require('express');
const  {addQuestion,getQuestionPaperByMarks,getQuestionPaper,getQuestionPaperbyNumberOFques}  = require("../Controller/Question");

const router = express.Router();

router.post('/add', addQuestion); 
// router.get('/genratepaper',genratePaper);
router.post('/getQuestionPaper',getQuestionPaper);
router.post('/getQuestionPaperByMarks',getQuestionPaperByMarks);
router.post('/getQuestionPaperbyNumberOFques',getQuestionPaperbyNumberOFques);



module.exports = router;