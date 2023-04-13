import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainHeader from '../Partials/MainHeader';
import LocationCard from '../Partials/LocationCard';

const getDestinations = async () => {
    const hostname = window.location.hostname;
    const response = await fetch(`http://${hostname}:3001/data/destinations`, {
        method : "GET",
        mode: 'cors'
    });
    let data = await response.json();
    return data;
}

function ChooseEnd() {
    let { start } = useParams()
    let [cardData, setCardData] = useState();

    useEffect(() => {
        getDestinations().then(result => setCardData(result));
    },[]);

    return (
        <div className='ChooseEnd'>
            <MainHeader />
            <div className='container'>
                <h3>Start location chosen: {start}</h3>
                <h3>Choose end location</h3>

                <LocationCard data={cardData}/>
            </div>
		</div>
    )
}

export default ChooseEnd;