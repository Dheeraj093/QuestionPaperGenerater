const Question = require("../Model/Question");

const addQuestion = async(req,res) =>{
     const { question, subject, topic, difficulty, marks } = req.body;

  try {
     const ques = await Question.findOne({ question });
      // console.log(ques);
      if (ques) {
        res.status(400).json({ error: 'Question Already Exists' });
      }
      else{
          const newQuestion = new Question({ question, subject, topic, difficulty, marks });
          await newQuestion.save();
          res.json({ success: true, message: 'Question inserted successfully' });
      }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



const getQuestionPaper =async(req,res)=>{

   try {
    const { subject, totalMarks, easyPercentage, mediumPercentage, hardPercentage } = req.body;

    if (!subject || !totalMarks || !easyPercentage || !mediumPercentage || !hardPercentage) {
      throw new Error("Please Fill All Entry.");
    }


    const easyPer = Number(easyPercentage);
    const mediumPer = Number(mediumPercentage);
    const hardPer = Number(hardPercentage);
    const total = Number(totalMarks); 

    if (easyPer + mediumPer + hardPer !== 100) {
      throw new Error("Please provide All percentage sum is 100");
    }

    const easyMarks = (easyPer / 100) * total;
    const mediumMarks = (mediumPer / 100) * total;
    const hardMarks = (hardPer / 100) * total;

    const hardQuestion = hardMarks/5;
    const remender1 = hardMarks%5;
    const mediumQuestion = (mediumMarks+ remender1 )/2;
    const remender2 = (mediumMarks+ remender1 )%2;
    const easyQuestion = (easyMarks+remender2)/1;
    

    // for easy question 
    const pipeline1 = [
      { $match: { subject : subject, difficulty:"easy" } },
      { $sample: { size: easyQuestion } },
    ];

    const Data1 = await Question.aggregate(pipeline1);
  
    //for medium question 
    const pipeline2 = [
      { $match: { subject : subject, difficulty:"medium" } },
      { $sample: { size: mediumQuestion } },
    ];

    const Data2 = await Question.aggregate(pipeline2);


    //for hard question
    const pipeline3 = [
      { $match: { subject : subject, difficulty:"hard" } },
      { $sample: { size: hardQuestion } },
    ];

    const Data3 = await Question.aggregate(pipeline3);

    const Data = [...Data1,...Data2,...Data3]
    res.json({
           success: true,
           message: 'Question fetched!!' ,
           data:Data
      });
          // console.log(filteredQuestions)
  } catch (error) {
     res.status(400).json({ success: false, message: error.message});
  }
}






/// -------------------------------if Marks is given --------------------------------------------     -


const getQuestionPaperByMarks =async(req,res)=>{
  

   try {
    const { subject, totalMarks, easyPercentage, mediumPercentage, hardPercentage, byQuestionMarks} = req.body;

    if (!subject || !totalMarks || !easyPercentage || !mediumPercentage || !hardPercentage || !byQuestionMarks.easy || !byQuestionMarks.medium || !byQuestionMarks.hard) {
      throw new Error("Please Fill All Entry.");
    }

    if(byQuestionMarks.easy > byQuestionMarks.medium || byQuestionMarks.easy > byQuestionMarks.hard){
        throw new Error("Please provide marks of easy question less than medium and hard question");
    }

    if( byQuestionMarks.medium > byQuestionMarks.hard){
        throw new Error("Please provide marks of medium question less than hard question");
    }

    const easyPer = Number(easyPercentage);
    const mediumPer = Number(mediumPercentage);
    const hardPer = Number(hardPercentage);
    const total = Number(totalMarks)

    if (easyPer + mediumPer + hardPer !== 100) {
      throw new Error("Please provide All percentage sum is 100");
    }

    // console.log(byQuestionMarks)

    const easyMarks = (easyPer / 100) * total;
    const mediumMarks = (mediumPer / 100) * total;
    const hardMarks = (hardPer / 100) * total;

    const hardQuestion = Math.floor(hardMarks/byQuestionMarks.hard);
    const remender1 = hardMarks%byQuestionMarks.hard;
    const mediumQuestion = Math.floor((mediumMarks+ remender1 )/byQuestionMarks.medium);
    const remender2 = (mediumMarks+ remender1 )%byQuestionMarks.medium;
    const easyQuestion = Math.floor((easyMarks+remender2)/byQuestionMarks.easy);
    
   
    if(easyQuestion*byQuestionMarks.easy + mediumQuestion*byQuestionMarks.medium + hardQuestion*byQuestionMarks.hard !== total ){
        throw new Error("Please provide perfect Marks Distribution");
    }
    

    // for easy question 
    const pipeline1 = [
      { $match: { subject : subject, difficulty:"easy" } },
      { $sample: { size: easyQuestion } },
    ];

    const Data1 = await Question.aggregate(pipeline1);

    const newData1 = Data1.map((item) => ({
      ...item,
      marks: byQuestionMarks.easy,
    }));

    //for medium question 
    const pipeline2 = [
      { $match: { subject : subject, difficulty:"medium" } },
      { $sample: { size: mediumQuestion } },
    ];

    const Data2 = await Question.aggregate(pipeline2);

    const newData2 = Data2.map((item) => ({
      ...item,
      marks: byQuestionMarks.medium,
    }));


    //for hard question
    const pipeline3 = [
      { $match: { subject : subject, difficulty:"hard" } },
      { $sample: { size: hardQuestion } },
    ];

    const Data3 = await Question.aggregate(pipeline3);

    const newData3 = Data3.map((item) => ({
      ...item,
      marks: byQuestionMarks.hard,
    }));

    const Data = [...newData1,...newData2,...newData3]
    // console.log(Data)
    res.json({
           success: true,
           message: 'Question fetched!!' ,
           data:Data
      });
          // console.log(filteredQuestions)
  } catch (error) {
     res.status(400).json({ success: false, message: error.message});
  }
}





// -------------------------------  if Number of question is given -----------------------------


const getQuestionPaperbyNumberOFques =async(req,res)=>{

   try {
    const { subject, totalMarks, easyPercentage, mediumPercentage, hardPercentage ,byNumber } = req.body;

    if (!subject || !totalMarks || !easyPercentage || !mediumPercentage || !hardPercentage || !byNumber.easy || !byNumber.medium || !byNumber.hard) {
      throw new Error("Please Fill All Entry.");
    }
    

    const easyPer = Number(easyPercentage);
    const mediumPer = Number(mediumPercentage);
    const hardPer = Number(hardPercentage);
    const total = Number(totalMarks)
    

    if (easyPer + mediumPer + hardPer !== 100) {
      throw new Error("Please provide All percentage sum is 100");
    }

    const easyMarks = (easyPer / 100) * total;
    const mediumMarks = (mediumPer / 100) * total;
    const hardMarks = (hardPer / 100) * total;

    const hardQuestionMarks = hardMarks/byNumber.hard;
    const remender1 = hardMarks%byNumber.hard;
    const mediumQuestionMarks = (mediumMarks+ remender1 )/byNumber.medium;
    const remender2 = (mediumMarks+ remender1 )%byNumber.medium;
    const easyQuestionMarks = (easyMarks+remender2)/byNumber.easy;
    
    if(easyQuestionMarks > mediumQuestionMarks || easyQuestionMarks > hardQuestionMarks ){
       throw new Error("Marks of a Easy Question is not Possible greater than Medium or Hard");
    }
    if(mediumQuestionMarks > hardQuestionMarks ){
       throw new Error("Marks of a Medium Question is not Possible greater than Hard");
    }
    

    // for easy question 
    const pipeline1 = [
      { $match: { subject : subject, difficulty:"easy" } },
      { $sample: { size: byNumber.easy } },
    ];

    const Data1 = await Question.aggregate(pipeline1);

    const newData1 = Data1.map((item) => ({
      ...item,
      marks: easyQuestionMarks,
    }));

    //for medium question 
    const pipeline2 = [
      { $match: { subject : subject, difficulty:"medium" } },
      { $sample: { size: byNumber.medium } },
    ];

    const Data2 = await Question.aggregate(pipeline2);

    const newData2 = Data2.map((item) => ({
      ...item,
      marks: mediumQuestionMarks,
    }));


    //for hard question
    const pipeline3 = [
      { $match: { subject : subject, difficulty:"hard" } },
      { $sample: { size: byNumber.hard } },
    ];

    const Data3 = await Question.aggregate(pipeline3);

    const newData3 = Data3.map((item) => ({
      ...item,
      marks: hardQuestionMarks,
    }));

    const Data = [...newData1,...newData2,...newData3]
    res.json({
           success: true,
           message: 'Question fetched!!' ,
           data:Data
      });
          // console.log(filteredQuestions)
  } catch (error) {
     res.status(400).json({ success: false, message: error.message});
  }
}


module.exports = {
  addQuestion,
  getQuestionPaper,
  getQuestionPaperByMarks,
  getQuestionPaperbyNumberOFques
};