import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import QuestionPaperGeneration from './components/QuestionPaperGeneration';
import AddQuestionForm from './components/AddQuestionForm';

const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '10px',
  },
  ul: {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    display: 'flex',
  },
  li: {
    margin: '0 15px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link to="/" style={styles.link}>Generate Question Paper</Link>
        </li>
        <li style={styles.li}>
          <Link to="/addQuestion" style={styles.link}>Add Question</Link>
        </li>
        
      </ul>
    </nav>

        <Routes>
          <Route path="/" element={<QuestionPaperGeneration />} />
          <Route path="/addQuestion" element={<AddQuestionForm />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
