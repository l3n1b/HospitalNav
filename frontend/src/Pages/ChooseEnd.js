import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainHeader from '../Partials/MainHeader';
import LocationCard from '../Partials/LocationCard';
import './ChooseEnd.css'

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
                <h3 className="choose-end">Start location: {start}</h3>
                <h4 className="choose-end">Select what destination you are going to</h4>

                <LocationCard data={cardData} start={start}/>
            </div>
		</div>
    )
}

export default ChooseEnd;