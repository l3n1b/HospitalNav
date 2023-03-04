import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Homepage.css'
import UserInputModal from '../UserInputModal/UserInputModal'

function Homepage() {

    const [entryDoor, setEntryDoor] = useState(null) 
    const [goalLocation, setGoalLocation] = useState(null)

    return (
        <div className='Homepage'>
            <UserInputModal />
            <header className='Homepage-header'>
                <img src={process.env.PUBLIC_URL + "/UKlogo-white.png"} 
                    alt="UKlogo.png" className='UKLogo'/>
                <div className="Header-links-div">
                    <a className="Header-link" href="https://ukhealthcare.uky.edu"
                        target="_blank" rel="noopener noreferrer" >
                    UK HEALTHCARE
                    </a>
                </div>
            </header>
		</div>
    )
}

export default Homepage;