import React, { useEffect, useState } from 'react';
import './ChipGenerator.css';

const ChipGenerator = ({ placeholder, setSelectedChips }) => {
    const [chips, setChips] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(()=>{
        setSelectedChips(chips)
    },[chips])

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddChip = () => {
        if (inputValue.trim() !== '') {
            setChips([...chips, inputValue.trim()]);
            setInputValue(''); // Clear the input field
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddChip();
        }
    };

    const handleRemoveChip = (index) => {
        setChips(chips.filter((_, chipIndex) => chipIndex !== index));
    };

    return (
        <div className="chip-generator">
            <div className="chip-input-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder={placeholder}
                />
                <button onClick={handleAddChip}>Add</button>
            </div>
            <div className="chip-list">
                {chips.map((chip, index) => (
                    <div key={index} className="chip">
                        {chip}
                        <span className="close-button" onClick={() => handleRemoveChip(index)}>
                            &times;
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChipGenerator;
