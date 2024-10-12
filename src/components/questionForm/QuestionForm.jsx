import React, { useEffect, useState } from 'react';
import './QuestionForm.css';

const QuestionForm = ( {setPrompt, onSubmit} ) => {
    const [question, setQuestion] = useState('');
    const [submittedQuestion, setSubmittedQuestion] = useState(null);

    useEffect(()=>{
        setPrompt(submittedQuestion)
    },[submittedQuestion])

    const handleInputChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = () => {
        if (question.trim() !== '') {
            setSubmittedQuestion(question.trim());
            onSubmit(question.trim())
            setQuestion('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="question-form-container">
            <div className="question-input-container">
                <input
                    type="text"
                    value={question}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask your question here..."
                />
                <button onClick={handleSubmit}>Send</button>
            </div>
            {submittedQuestion && (
                <div className="question-display">
                    <p><strong>Your Question:</strong> {submittedQuestion}</p>
                </div>
            )}
        </div>
    );
};

export default QuestionForm;
