import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainHeader from '../Partials/MainHeader';
import { ReactPhotoSphereViewer, MapPlugin } from 'react-photo-sphere-viewer';
import './Map2d.css'

const XScale = 2.75846
const XOffset = 309.9
const YScale = 2.94737
const YOffset = 462.8

const getData = async (start, end) => {
    const hostname = window.location.hostname;
    const response = await fetch(`http://${hostname}:3001/data/${start}/${end}`, {
        method : "GET",
        mode: 'cors'
    });
    let data = await response.json()
    return data
}

const Map2D = () => {
    let {start, end} = useParams()
    let [photoViewerElement, setPhotoViewerElement] = useState();
    let [routeElement, setRouteElement] = useState();

    let route;

    useEffect(() => {
        getData(start, end).then(
            result => {
                console.log(result)
                let plugins = ([
                                [MapPlugin, {
                                    imageUrl: (process.env.PUBLIC_URL + '/maps/Floor1Map.jpg'),
                                    center: { x: result.x, y: result.y },
                                    rotation: '-12deg',
                                }],
                            ])
                setPhotoViewerElement(getPhotoViewer(plugins, result.imagePath));

                setRouteElement(createRouteElement(result.route));

            });
    },[]);

    // const plugins2 = [
    //     [CompassPlugin, {
    //         hotspots: [
    //         { longitude: '0deg' },
    //         { longitude: '90deg' },
    //         { longitude: '180deg' },
    //         { longitude: '270deg' },
    //         ],
    //     }]
    // ]

    // {% for location in path %}
    // <li id="{{ location.name }}" style="display:inline; border-radius: 8px; border-width:3px; border-style:solid; border-color:	#0000FF;">{{ location.name }}</li>
    // {% endfor %}

    return (
        <div className='Map2D'>
            <MainHeader />
            <div className="controlBox">
                <div className="destBox">
                    {/* <h3 className="infoText">Start location:<br/>
                        {start}</h3> */}
                    <div className="buttonDiv">
                        <a href="..">
                            <button className="customButton" role="button">New Start Location</button>
                        </a>
                    </div>
                </div>
                <div className="destBox">
                    {/* <h3 className="infoText">End location:<br/>
                        {end}</h3> */}
                    <div className="buttonDiv">
                        <a href={"../" + start}>
                            <button className="customButton" role="button">New End Location</button>
                        </a>
                    </div>
                </div>
            </div>

            <div>
                {routeElement}
            </div>

            {photoViewerElement}
		</div>
    )
}

function getPhotoViewer(plugins, imagePath) {
    return <ReactPhotoSphereViewer src={process.env.PUBLIC_URL + imagePath}
    height={'75vh'} width={"100%"} plugins={plugins}
    ></ReactPhotoSphereViewer>
}

function createRouteElement(routeData) {
    let locations = []
    routeData.forEach( (item) => {
        console.log(item.name)
        locations.push(<div className='nav-item'>{item.name}</div>)
        locations.push(<div className='nav-item'>&nbsp; → &nbsp;</div>)
    })

    locations.pop() // remove last arrow

    return (
        <div className='test nav-route'>
            {locations}
        </div>
    )
}

export default Map2D;