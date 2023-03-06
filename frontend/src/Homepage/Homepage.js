import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Homepage.css'
import MainHeader from '../MainHeader/MainHeader'

/*
Example URLs: 
    http://localhost:3000/?entry=""&destination=""
    http://localhost:3000/?entry="door_1"&destination="cardiovascular"
    http://localhost:3000/?entry="door_1"&destination=""

    Currently the homepage automatically routes if either of the
    values (entry or destination) are not set. This can be changed.
*/

function Homepage() {
    const naviagte = useNavigate()
    const queryParameters = new URLSearchParams(window.location.search)

    // check if the user has a destination or entryDoor. 
    // If they do not have an entryDoor, route them to destSelector
    // If they do not have a destination, route them to destSelector
    useEffect(() => {
        if(!queryParameters.get("entry")){
            naviagte("/chooseEntry")
        }
        else if(!queryParameters.get("destination")){
            naviagte("/chooseDest")
        }
    })
    
    return (
        <div className='Homepage'>
            <MainHeader />
            {/*
            This is where a map component will be rendered (Joseph)
            */}
		</div>
    )
}

export default Homepage;