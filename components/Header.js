// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Properties Manager</Link>
                <div className="navbar-nav">
                    <Link to="/properties" className="nav-link">Properties</Link>
                    {/* Add more navigation links if needed */}
                </div>
            </div>
        </nav>
    );
};

export default Header;