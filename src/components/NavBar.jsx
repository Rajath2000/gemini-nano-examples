// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">Flash bot</div>
            <ul className="navbar-links">
                <li>
                    <Link to="/FAQ">FAQs</Link>
                </li>
                <li>
                    <Link to="/chat">Chat</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
