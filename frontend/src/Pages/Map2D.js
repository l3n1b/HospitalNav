import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainHeader from '../Partials/MainHeader';
import { ReactPhotoSphereViewer, MapPlugin } from 'react-photo-sphere-viewer';
import './Map2d.css'

// Asynchronous function to get image, coordinate, and route information from the backend
const getData = async (start, end) => {
    const hostname = window.location.hostname;
    const response = await fetch(`http://${hostname}:3001/data/${start}/${end}`, {
        method : "GET",
        mode: 'cors'
    });
    let data = await response.json()
    return data
}

// Function that returns the map component to be rendered
const Map2D = () => {
    let {start, end} = useParams()
    let [photoViewerElement, setPhotoViewerElement] = useState();
    let [routeElement, setRouteElement] = useState();
    let [activeLocation, setActiveLocation] = useState();
    let [nextLocation, setNextLocation] = useState();
    let [route, setRoute] = useState();

    if (activeLocation === undefined || activeLocation === null) {
        setActiveLocation(start);
    }

    // useEffect tells the program to do something after the component renders
    useEffect(() => {
        getData(start, end).then( // retrieve data from backend
            result => {
                let plugins = ([ // set up plugin for photo sphere viewer
                                [MapPlugin, {
                                    imageUrl: (process.env.PUBLIC_URL + '/maps/Floor1Map.jpg'),
                                    center: { x: result.x, y: result.y },
                                    rotation: '-12deg',
                                }],
                            ])

                setRoute(result.route);
                setPhotoViewerElement(getPhotoViewer(plugins, result.imagePath)); // Store photo viewer element to variable

                setRouteElement(createRouteElement(result.route, activeLocation)); // Store route element to variable

                setNextLocation(getNextLocation(result.route, activeLocation)); // Set next location for next button to take user to
            });
    },[]);

    const loadNext = (location) => {
        console.log(location);
        setActiveLocation(location);
        console.log(activeLocation);
        setRouteElement(createRouteElement(route, location));
        setNextLocation(getNextLocation(route, location));
    }

    // create the map page out of the collected data
    return (
        <div className='Map2D'>
            <MainHeader />
            <div className="controlBox">
                <div className="destBox">
                    <div className="buttonDiv">
                        <a href="..">
                            <button className="customButton" role="button">New Start Location</button>
                        </a>
                    </div>
                </div>
                <div className="destBox">
                    <div className="buttonDiv">
                        <a href={"../" + start}>
                            <button className="customButton" role="button">New End Location</button>
                        </a>
                    </div>
                </div>
                <div className="destBox">
                    <div className="buttonDiv">
                        <button className="customButton" onClick={() => loadNext(nextLocation)} role="button">Next</button>
                    </div>
                </div>
            </div>

            {routeElement}

            {photoViewerElement}
		</div>
    )
}

// Create photo sphere viewer as react component
function getPhotoViewer(plugins, imagePath) {
    return <ReactPhotoSphereViewer src={process.env.PUBLIC_URL + imagePath}
    height={'75vh'} width={"100%"} plugins={plugins}
    ></ReactPhotoSphereViewer>
}

// Creates an element with the list of locations to be visited on the path to the patient's destination
function createRouteElement(routeData, activeLocation) {
    let locations = []

    routeData.forEach( (location) => {
        let thisItemBold = false;
        if (activeLocation === location) { // on active location
            thisItemBold = true; // make this element bold
        }

        locations.push(<div key={location} className={`navitem ${thisItemBold ? "bold-location" : ""}`}>{location}</div>)
        locations.push(<div key={location + "Arrow"} className='nav-item'>&nbsp; → &nbsp;</div>)
    })

    locations.pop() // remove last arrow

    return (
        <div className='test nav-route'>
            {locations}
        </div>
    )
}

function getNextLocation(route, activeLocation) {
    for(let i = 0; i < route.length; i++) {
        if (route[i] === activeLocation) {
            if(i < route.length - 1) {
                return route[i+1];
            }
            else
                return route[0];
        }
    }

    return null;
}

export default Map2D;