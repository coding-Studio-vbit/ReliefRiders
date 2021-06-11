import React from 'react';
import './topbanner.css'
const TopBanner = () => {
    return (
        <div className="top-banner">
            <span>Difficulty in using the app?</span>
            <div className="call-btn">
                <i className="fas fa-phone-alt"></i>
                <a href="tel:+919999999999" className="nnn" >9999999999</a>
            </div>
        </div>
    );
}

export default TopBanner;