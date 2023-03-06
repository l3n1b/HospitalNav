import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Homepage.css'
import MainHeader from '../MainHeader/MainHeader'

function Homepage() {

    const [entryDoor, setEntryDoor] = useState(null) 
    const [goalLocation, setGoalLocation] = useState(null)

    return (
        <div className='Homepage'>
            <MainHeader />
		</div>
    )
}

export default Homepage;