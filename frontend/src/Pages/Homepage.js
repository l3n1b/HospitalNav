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
                    {/* <img src="../backend/data/images/1st Floor Main Entrance.JPG" alt="1st Floor Main Entrance Photo" style={{width: '100%'}}/> */}
                    <img src="../backend/shrek.jpg" alt="Shrek Image" style={{width: '100%'}} />
                    <div class="container">
                        <a href='1st Floor Main Entrance'>1st Floor Main Entrance</a>
                        <p>Accessed from parking garage via Huguelet Avenue</p> 
                    </div>
                </div>

                <div class="card">
                    <div class="container">
                        <a href='UHS Entrance'>UHS Entrance</a>
                        <p>Accessed from South Limestone</p> 
                    </div>
                </div>

                <div class="card">
                    <div class="container">
                        <a href='South Limestone Entrance A'>South Limestone Entrance A</a>
                        <p>Second door when turning into drive off of South Limestone</p> 
                    </div>
                </div>

                <div class="card">
                    <div class="container">
                        <a href='Rose Street Entrance'>Rose Street Entrance</a>
                        <p>Accessed from Rose Street</p> 
                    </div>
                </div>

                <div class="card">
                    <div class="container">
                        <a href='South Limestone Entrance B'>South Limestone Entrance B</a>
                        <p>First door when turning into drive off of South Limestone</p> 
                    </div>
                </div>
                
            </div>
		</div>
    )
}

export default Homepage;