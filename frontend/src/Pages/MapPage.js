import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainHeader from '../Partials/MainHeader';
import { ReactPhotoSphereViewer, MapPlugin } from 'react-photo-sphere-viewer';
import './MapPage.css'
import MapButton from '../Partials/MapButton';

// Asynchronous function to get image, coordinate, and route information from the backend
const getData = async (start, activeLocation, end) => {
    const hostname = window.location.hostname;
    const response = await fetch(`http://${hostname}:3001/data/${start}/${activeLocation}/${end}`, {
        method : "GET",
        mode: 'cors'
    });
    let data = await response.json()
    return data
}

// Function that returns the map component to be rendered
const MapPage = () => {
    let {start, end} = useParams()
    let [photoViewerElement, setPhotoViewerElement] = useState();
    let [routeElement, setRouteElement] = useState();
    let [nextLocation, setNextLocation] = useState();

    // Set photo sphere viewer and route element and nextLocation variable
    const rerender = (result, location) => {
        let plugins = createMapPlugin(result.x, result.y);
        setPhotoViewerElement(getPhotoViewer(plugins, result.imagePath)); // Store photo viewer element to variable
        setRouteElement(createRouteElement(result.route, location)); // Store route element to variable
        setNextLocation(getNextLocation(result.route, location)); // Set next location for next button to take user to
    }

    // useEffect tells the program to do something after the component renders
    useEffect(() => {
        getData(start, start, end).then( // retrieve data from backend
            result => {rerender(result, start);}
            );
    },[]);

    // function for Next button to call to re-render page
    const loadNext = (location) => {
        setPhotoViewerElement(null);
        getData(start, location, end).then(
            (result) => {
                rerender(result, nextLocation);
            }
        )
    }

    // create the map page out of the collected data
    return (
        <div className='MapPage'>
            <MainHeader />
            <div className="controlBox">
                <MapButton link=".." displayText="New Entrance" />
                <MapButton link={"../" + start} displayText="New Destination" />

                <div className="destBox">
                    <div className="buttonDiv">
                        <button className="customButton" onClick={() => loadNext(nextLocation)} role="button">Next Image</button>
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
    console.log(imagePath)
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

        // puts a div with location text and a div with just an arrow into locations array
        locations.push(<div key={location} className={`navitem ${thisItemBold ? "bold-location" : ""}`}>{location}</div>)
        locations.push(<div key={location + "Arrow"} className='nav-item'>&nbsp; → &nbsp;</div>)
    })

    locations.pop() // remove last arrow

    // return constucted array of divs
    return (
        <div className='nav-route'>
            {locations}
        </div>
    )
}

// Return what the next location will be given the route and current location
// Wraps around to the first location if at the last location in route
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

// set up plugin for photo sphere viewer
function createMapPlugin(x, y) {
    return ([
        [MapPlugin, {
            imageUrl: (process.env.PUBLIC_URL + '/maps/Floor1Map.jpg'),
            center: { x, y },
            rotation: '-12deg',
        }],
    ])
}

export default MapPage;