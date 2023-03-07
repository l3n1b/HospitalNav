import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../Partials/LoadingSpinner';
import './Homepage.css'
import UserInputModal from '../Partials/UserInputModal'
import Header from '../Partials/Header';

function Homepage() {

    const [entryDoor, setEntryDoor] = useState(null)
    const [goalLocation, setGoalLocation] = useState(null)

    return (
        <div className='Homepage'>
            <UserInputModal />
            <Header />
            <div>
                <h3>Choose start location</h3>
                <li><a href='1st Floor Main Entrance'>1st Floor Main Entrance</a></li>
                <li><a href='UHS Entrance'>UHS Entrance</a></li>
                <li><a href='South Limestone Entrance A'>South Limestone Entrance A</a></li>
                <li><a href='Rose Street Entrance'>Rose Street Entrance</a></li>
                <li><a href='South Limestone Entrance B'>South Limestone Entrance B</a></li>
            </div>
		</div>
    )
}

export default Homepage;