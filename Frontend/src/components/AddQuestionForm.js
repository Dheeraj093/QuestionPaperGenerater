import React, { useState } from 'react';

const AddQuestionForm = () => {
  const [formData, setFormData] = useState({
    question: '',
    subject: '',
    topic: '',
    difficulty: '',
    marks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const addQuestion = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

    
      if (response.ok) {
        console.log("Question Added Successfully");
      } else {
        console.error('Already added this question');
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };


  return (
      <div style={styles.container}>
      <h2 style={styles.heading} >Add Question</h2>
      <form>
        <div style = {styles.row}>
          <label htmlFor="question" style={styles.label}> Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style = {styles.row}>
          <label htmlFor="subject" style={styles.label} >Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style = {styles.row}>
          <label htmlFor="topic" style={styles.label}>Topic:</label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style = {styles.row}>
          <label htmlFor="difficulty" style={styles.label} >Difficulty:</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            style={styles.select}
            required
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div style = {styles.row}>
          <label htmlFor="marks" style={styles.label} >Marks:</label>
          <select
            id="marks"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
            style={styles.select}
            required
          >
            <option value="">Select Marks</option>
            <option value="1">1 Marks For Easy</option>
            <option value="2">2 Marks For Medium</option>
            <option value="3">5 Marks For Hard</option>
          </select>
        </div>
        <button type="button" onClick={addQuestion} style={styles.submitButton}>
          Generate Question Paper
        </button>
        
      </form>
    </div>
  );
};

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
  textarea: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    minHeight: '100px',
  },
   select: {
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'start',
    padding: '8px',
    width: '200px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    margin: '20px 0px 0px 0px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AddQuestionForm;
