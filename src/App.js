// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FAQs from './pages/FAQs';
import Chat from './pages/Chat';
import Contact from './pages/Contact';
import Navbar from './components/NavBar';
import GeminiSupport from './higherOrderComponents/geminiSupport';

function App() {
    return (
      <React.Fragment>
        <GeminiSupport>
        <Router>
            <Navbar />
            <div>
                <center><h1>Welcome to Gemini Nano</h1></center>
                <Routes>
                    <Route path="/FAQ" element={<FAQs />} />
                    <Route path="/Chat" element={<Chat />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </Router>
        </GeminiSupport>
      </React.Fragment>
    );
}

export default App;
