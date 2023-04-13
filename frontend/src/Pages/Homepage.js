import React, { useState } from 'react';
import './Homepage.css'
import MainHeader from '../Partials/MainHeader';

function Homepage() {

    const [entryDoor, setEntryDoor] = useState(null)
    const [goalLocation, setGoalLocation] = useState(null)

    return (
        <div className='Homepage'>
            <MainHeader />
            <div>
                <h3>Choose start location</h3>
                {/* <li><a href='1st Floor Main Entrance'>1st Floor Main Entrance</a></li> */}

                {/* <a href='1st Floor Main Entrance'> */}
                    <div className="card">
                        {/* <img src="../backend/data/images/1st Floor Main Entrance.JPG" alt="1st Floor Main Entrance Photo" style={{width: '100%'}}/> */}
                        {/* <img src="http://localhost:3001/test" alt="Shrek Image" style={{width: '100%'}} /> */}
                        <div className="container">
                            <a href='1st Floor Main Entrance'>
                                1st Floor Main Entrance
                                <span className='clickable-card'></span>
                            </a>
                            <p>Accessed from parking garage via Huguelet Avenue</p>
                        </div>
                    </div>

                <div className="card">
                    <div className="container">
                        <a href='UHS Entrance'>
                            UHS Entrance
                            <span className='clickable-card'></span>
                        </a>
                        <p>Accessed from South Limestone</p>
                    </div>
                </div>

                <div className="card">
                    <div className="container">
                        <a href='South Limestone Entrance A'>
                            South Limestone Entrance A
                            <span className='clickable-card'></span>
                        </a>
                        <p>Second door when turning into drive off of South Limestone</p>
                    </div>
                </div>

                <div className="card">
                    <div className="container">
                        <a href='Rose Street Entrance'>
                            Rose Street Entrance
                            <span className='clickable-card'></span>
                        </a>
                        <p>Accessed from Rose Street</p>
                    </div>

                </div>

                <div className="card">
                    <div className="container">
                        <a href='South Limestone Entrance B'>
                            South Limestone Entrance B
                            <span className='clickable-card'></span>
                        </a>
                        <p>First door when turning into drive off of South Limestone</p>
                    </div>
                </div>

            </div>
		</div>
    )
}

export default Homepage;