import React, { useState, useEffect } from 'react';
import './Homepage.css'
import MainHeader from '../Partials/MainHeader';
import LocationCard from '../Partials/LocationCard';

const getEntrances = async () => {
    const hostname = window.location.hostname;
    const response = await fetch(`http://${hostname}:3001/data/entrances`, {
        method : "GET",
        mode: 'cors'
    });
    let data = await response.json();
    return data;
}

function Homepage() {
    let [cardData, setCardData] = useState();

    useEffect(() => {
        getEntrances().then(result => setCardData(result));
    },[]);

    return (
        <div className='Homepage'>
            <MainHeader />
            <div>
                <h3 className="choose-start">Choose start location</h3>

                <LocationCard data={cardData} start=""/>

            </div>
		</div>
    )
}

export default Homepage;