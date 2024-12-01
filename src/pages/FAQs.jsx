import React, { useEffect, useState } from 'react';
import QuestionForm from '../components/questionForm/QuestionForm';
import ai from '../utils/gemini-nano-wrapper/ai';
import './FAQs.css';
import ChipGenerator from '../components/chipGenerator/ChipGenerator';

const FAQs = () => {
    const [selectedChips, setSelectedChips] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (question) => {
        setPrompt(question);
        if (question && selectedChips.length > 0) {
            setIsLoading(true); // Start loading
            try {
                const result = await ai.getFAQs(selectedChips, question);
                if (result) {
                    setResult(result);
                }
            } catch (error) {
                console.error('Error fetching FAQ:', error);
                setResult('An error occurred while fetching the answer. Please try again later.');
            } finally {
                setIsLoading(false); // Stop loading
            }
        }
    };

    useEffect(()=>{
        return () =>{
            ai.closeSession()
        }
    },[])

    return (
        <div className="faq-container">
            <h2>General FAQ Section</h2>
            <p>Choose or add a topic of your interest and ask a question to get an answer.</p>

            <div className="chip-generator-section">
                <ChipGenerator
                    placeholder="Example: Cricket, Entertainment, Technology"
                    setSelectedChips={setSelectedChips}
                />
            </div>
            {selectedChips.length > 0 && (
                <div className="question-form-section">
                    <QuestionForm setPrompt={setPrompt} onSubmit={onSubmit} />
                </div>
            )}

            <div className="result-section">
                {isLoading ? (
                    <p className="loading-message">Processing your request...</p>
                ) : (
                    result && <div className="result-message">{result?.response}</div>
                )}
            </div>
        </div>
    );
};

export default FAQs;
