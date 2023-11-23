// src/components/QuestionPaperGeneration.js
import React, { useState } from 'react';
import GeneratedQuestionPaper from './GeneratedQuestionPaper';
import Swal from "sweetalert2";
import axios from 'axios';
const styles = {
  container: {
    margin: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
  },
  row :{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '250px',
    paddingRight: '250px',
    margin: '10px 0px'
  },
  label: {
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'start',
    marginBottom: '5px',
    color: '#000',
    fontWeight: '6 00',
  },
  input: {
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'start',
    padding: '8px',
    width: '200px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  generateButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    margin: '20px 0px 0px 0px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};



const QuestionPaperGeneration = () => {
  const [criteria, setCriteria] = useState({
    subject: '',
    totalMarks: 100,
    easyPercentage: 20,
    mediumPercentage: 50,
    hardPercentage: 30,
    paperType: 'Deafult',
    byNumber: {
      easy: 0,
      medium: 0,
      hard: 0,
    },
    byQuestionMarks: {
      easy: 0,
      medium: 0,
      hard: 0,
    },
  });

  const [generatedQuestionPaper, setGeneratedQuestionPaper] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  const handleByNumberChange = (e) => {
    const { name, value } = e.target;
    setCriteria((prevCriteria) => ({
      ...prevCriteria,
      byNumber: {
        ...prevCriteria.byNumber,
        [name]: parseInt(value, 10),
      },
    }));
  };

  const handleByQuestionMarksChange = (e) => {
    const { name, value } = e.target;
    setCriteria((prevCriteria) => ({
      ...prevCriteria,
      byQuestionMarks: {
        ...prevCriteria.byQuestionMarks,
        [name]: parseInt(value, 10),
      },
    }));
  };


const generateQuestionPaper = async () => {
  try {
     
    console.log(criteria)

    if (criteria.paperType === 'Deafult') {
      const response = await axios.post('https://questionpapergenerater.onrender.com/api/getQuestionPaper', criteria, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const questionPaper = response.data;
      setGeneratedQuestionPaper(questionPaper.data);
      console.log(questionPaper.data);
    } else if(criteria.paperType === 'ByNumber'){
        const response = await axios.post('https://questionpapergenerater.onrender.com/api/getQuestionPaperbyNumberOFques', criteria, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const questionPaper = response.data;
      setGeneratedQuestionPaper(questionPaper.data);
      console.log(questionPaper.data);
    } else  {
      const response = await axios.post('https://questionpapergenerater.onrender.com/api/getQuestionPaperByMarks', criteria, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const questionPaper = response.data;
      setGeneratedQuestionPaper(questionPaper.data);
    }
   
  } catch (error) {
    console.error('Error during API call:', error.response.data.message);
     Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message || "Something Error",
      });
  }
};

  return (
    <div style={styles.container}>
      <h2 style={styles.heading} >Generate Question Paper</h2>
      <form>
        <div  style = {styles.row}>
          <label htmlFor="subject" style={styles.label}>Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={criteria.subject}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style = {styles.row}>
          <label htmlFor="totalMarks" style={styles.label} >Total Marks:</label>
          <input
            type="number"
            id="totalMarks"
            name="totalMarks"
            value={criteria.totalMarks}
            onChange={handleChange}
            min="0"
            required
            style={styles.input}
          />
        </div>
        <div style = {styles.row}>
          <label htmlFor="easyPercentage" style={styles.label}>Easy Percentage:</label>
          <input
            type="number"
            id="easyPercentage"
            name="easyPercentage"
            value={criteria.easyPercentage}
            onChange={handleChange}
            min="0"
            max="100"
            required
            style={styles.input}
          />
        </div>
        <div style = {styles.row}>
          <label htmlFor="mediumPercentage" style={styles.label} >Medium Percentage:</label>
          <input
            type="number"
            id="mediumPercentage"
            name="mediumPercentage"
            value={criteria.mediumPercentage}
            onChange={handleChange}
            min="0"
            max="100"
            required
            style={styles.input}
          />
        </div>
        <div style = {styles.row}>
          <label htmlFor="hardPercentage" style={styles.label} >Hard Percentage:</label>
          <input
            type="number"
            id="hardPercentage"
            name="hardPercentage"
            value={criteria.hardPercentage}
            onChange={handleChange}
            min="0"
            max="100"
            required
            style={styles.input}
          />
        </div>
        <div style = {styles.row}>
          <label htmlFor="paperType" style={styles.label} >Paper Type:</label>
          <select id="paperType" name="paperType" value={criteria.paperType} onChange={handleChange} style={styles.input} >
            <option value="Deafult">Deafult</option>
            <option value="ByNumber">By Number</option>
            <option value="ByQuestionMarks">By Question Marks</option>
          </select>
        </div>
        {criteria.paperType === 'ByNumber' && (
          <div style = {styles.row}>
            <label htmlFor="byNumber.easy" style={styles.label}>Easy Questions:</label>
            <input
              type="number"
              id="byNumber.easy"
              name="easy"
              value={criteria.byNumber.easy}
              onChange={handleByNumberChange}
              min="0"
              required
              style={styles.input}
            />
          </div>
        )}
        {criteria.paperType === 'ByNumber' && (
          <div style = {styles.row}>
            <label htmlFor="byNumber.medium" style={styles.label} >Medium Questions:</label>
            <input
              type="number"
              id="byNumber.medium"
              name="medium"
              value={criteria.byNumber.medium}
              onChange={handleByNumberChange}
              min="0"
              required
              style={styles.input}
            />
          </div>
        )}
        {criteria.paperType === 'ByNumber' && (
          <div style = {styles.row}>
            <label htmlFor="byNumber.hard" style={styles.label}>Hard Questions:</label>
            <input
              type="number"
              id="byNumber.hard"
              name="hard"
              value={criteria.byNumber.hard}
              onChange={handleByNumberChange}
              min="0"
              required
              style={styles.input}
            />
          </div>
        )}
        {criteria.paperType === 'ByQuestionMarks' && (
          <div style = {styles.row}>
            <label htmlFor="byQuestionMarks.easy" style={styles.label} >Easy Question Marks:</label>
            <input
              type="number"
              id="byQuestionMarks.easy"
              name="easy"
              value={criteria.byQuestionMarks.easy}
              onChange={handleByQuestionMarksChange}
              min="0"
              required
              style={styles.input}
            />
          </div>
        )}
        {criteria.paperType === 'ByQuestionMarks' && (
          <div style = {styles.row}>
            <label htmlFor="byQuestionMarks.medium" style={styles.label} >Medium Question Marks:</label>
            <input
              type="number"
              id="byQuestionMarks.medium"
              name="medium"
              value={criteria.byQuestionMarks.medium}
              onChange={handleByQuestionMarksChange}
              min="0"
              required
              style={styles.input}
            />
          </div>
        )}
        {criteria.paperType === 'ByQuestionMarks' && (
          <div style = {styles.row}>
            <label htmlFor="byQuestionMarks.hard" style={styles.label} >Hard Question Marks:</label>
            <input
              type="number"
              id="byQuestionMarks.hard"
              name="hard"
              value={criteria.byQuestionMarks.hard}
              onChange={handleByQuestionMarksChange}
              min="0"
              required
              style={styles.input}
            />
          </div>
        )}
        <button type="button" onClick={generateQuestionPaper} style={styles.generateButton}>
          Generate Question Paper
        </button>
      </form>
      <GeneratedQuestionPaper questionPaper={generatedQuestionPaper} Details ={criteria} />
    </div>
  );
};

export default QuestionPaperGeneration;
