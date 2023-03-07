// Not used anymore

import React from 'react';

function Header() {

    return (
            <header className='Homepage-header Header'>
                <img src={process.env.PUBLIC_URL + "/UKlogo-white.png"}
                    alt="UKlogo.png" className='UKLogo'/>
                <div className="Header-links-div">
                    <a className="Header-link" href="https://ukhealthcare.uky.edu"
                        target="_blank" rel="noopener noreferrer" >
                    UK HEALTHCARE
                    </a>
                </div>
            </header>
    )
}

export default Header;