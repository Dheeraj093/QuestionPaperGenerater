import React from 'react';

const GeneratedQuestionPaper = ({ questionPaper ,Details}) => {
 
  return (
    <div >
      
      {questionPaper && (
        <div>
          <h2 style={{marginTop : "80px"}} >Generated Question Paper </h2>
          <div>
            <h3>Subject: {Details.subject}</h3>
            <div style={{display: "flex", justifyContent: 'space-between',padding: '0 50px'}} >
              <h3>Total Marks: {Details.totalMarks}</h3>
              <h3>Questions: {questionPaper.length}</h3>
            </div>
          </div>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Serial Number</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Question</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Topic</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Difficulty</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Marks</th>
              </tr>
            </thead>
            <tbody>
              {questionPaper?.map((question, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' , display : 'flex', alignItems : 'start'}}>{question.question}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{question.topic}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{question.difficulty}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{question.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GeneratedQuestionPaper;
