import React from 'react';
import './top-nav.css'
const TopNav = () => {
    return (
        <div className="top-banner">
            <div className="faicon">
                <i className="fas fa-chevron-left"></i>
            </div>
            <div className="header">
                <span>Enter Items</span>
            </div>
        </div>
    );
}

export default TopNav;