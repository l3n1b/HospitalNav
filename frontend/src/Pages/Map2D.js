import React from 'react';
import { useParams } from 'react-router-dom';
import MainHeader from '../Partials/MainHeader';

function Map2D() {
    let {start, end} = useParams()

    return (
        <div className='Map2D'>
            <MainHeader />
            <div className="container">
                <h3>Start location: {start}</h3>
                <h3>End location: {end}</h3>
                <p><a href='..'>Choose new start location</a></p>
                <p><a href={'../' + start}>Choose new end location</a></p>
            </div>
		</div>
    )
}

export default Map2D;