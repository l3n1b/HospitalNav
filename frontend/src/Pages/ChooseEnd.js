import React from 'react';
import { useParams } from 'react-router-dom';
import MainHeader from '../Partials/MainHeader';

function ChooseEnd() {
    let { start } = useParams()
    console.log(start)

    return (
        <div className='ChooseEnd'>
            <MainHeader />
            <div className='container'>
                <h3>Start location chosen: {start}</h3>
                <h3>Choose end location</h3>
                <li><a href={start + '/X-Ray_MRI'}>'X-Ray_MRI</a></li>
                <li><a href={start + '/General Surgery'}>'General Surgery</a></li>
                <li><a href={start + '/Vascular Interventional Radiology'}>'Vascular Interventional Radiology</a></li>
                <li><a href={start + '/Kentucky Neuroscience Institute'}>'Kentucky Neuroscience Institute</a></li>
                <li><a href={start + '/Orthopaedics'}>'Orthopaedics</a></li>
                <li><a href={start + '/Anesthesia Preop Services'}>'Anesthesia Preop Services</a></li>
                <li><a href={start + '/Physical_Occupational Therapy'}>'Physical_Occupational Therapy</a></li>
                <li><a href={start + '/Pharmacy'}>'Pharmacy</a></li>
                <li><a href={start + '/Image Records Center'}>'Image Records Center</a></li>
            </div>
		</div>
    )
}

export default ChooseEnd;