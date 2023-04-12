import React, { useState } from 'react';
import './Homepage.css'
import UserInputModal from '../Partials/UserInputModal'
import MainHeader from '../Partials/MainHeader';

function Homepage() {

    const [entryDoor, setEntryDoor] = useState(null)
    const [goalLocation, setGoalLocation] = useState(null)

    return (
        <div className='Homepage'>
            <UserInputModal />
            <MainHeader />
            <div>
                <h3>Choose start location</h3>
                {/* <li><a href='1st Floor Main Entrance'>1st Floor Main Entrance</a></li> */}
                
                <div class="card">
                    {/* <img src="../data/images/1st Floor Main Entrance.JPG" alt="1st Floor Main Entrance Photo" style="width:100%"/> */}
                    <div class="container">
                        <a href='1st Floor Main Entrance'>1st Floor Main Entrance</a>
                        <p>Off of S Limestone</p> 
                    </div>
                </div>

                <div class="card">
                    <div class="container">
                        <a href='UHS Entrance'>UHS Entrance</a>
                        <p>Off of S Limestone</p> 
                    </div>
                </div>

                <div class="card">
                    <div class="container">
                        <a href='South Limestone Entrance A'>South Limestone Entrance A</a>
                        <p>Off of S Limestone</p> 
                    </div>
                </div>

                <div class="card">
                    <div class="container">
                        <a href='Rose Street Entrance'>Rose Street Entrance</a>
                        <p>Off of S Limestone</p> 
                    </div>
                </div>

                <div class="card">
                    <div class="container">
                        <a href='South Limestone Entrance B'>South Limestone Entrance B</a>
                        <p>Off of S Limestone</p> 
                    </div>
                </div>
                {/* <li><a href='UHS Entrance'>UHS Entrance</a></li> */}
                {/* <li><a href='South Limestone Entrance A'>South Limestone Entrance A</a></li>
                <li><a href='Rose Street Entrance'>Rose Street Entrance</a></li>
                <li><a href='South Limestone Entrance B'>South Limestone Entrance B</a></li> */}

                
            </div>
		</div>
    )
}

export default Homepage;