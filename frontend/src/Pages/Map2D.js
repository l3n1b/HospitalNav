import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainHeader from '../Partials/MainHeader';
// import { Viewer } from '@photo-sphere-viewer/core';
import { ReactPhotoSphereViewer, MapPlugin } from 'react-photo-sphere-viewer';
import './Map2d.css'

const XScale = 2.75846
const XOffset = 309.9
const YScale = 2.94737
const YOffset = 462.8

const getData = async (start) => {
    const hostname = window.location.hostname;
    const response = await fetch("http://" + hostname + ":3001/data/" + start, {
        method : "GET",
        mode: 'cors'
    });
    // const response = await fetch("http://localhost:3001/data/" + start);
    let data = await response.json()

    // const data = await response.json();
    // console.log(data);
    return data
}

const Map2D = () => {
    let {start, end} = useParams()
    let [photoViewerElement, setPhotoViewerElement] = useState();

    useEffect(() => {
        getData(start).then(
            result => {
                console.log(result)
                let plugins = ([
                                [MapPlugin, {
                                    imageUrl: (process.env.PUBLIC_URL + '/maps/Floor1Map.jpg'),
                                    center: { x: result.x, y: result.y },
                                    rotation: '-12deg',
                                }],
                            ])
                setPhotoViewerElement(getPhotoViewer(plugins, result.path));
            });
    },[]);

    //     dataFetch()
    // }, []);

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

    return (
        <div className='Map2D'>
            <MainHeader />
            <div className="controlBox">
                <div className="destBox">
                    <h3 className="infoText">Start location:<br/>
                        {start}</h3>
                    <div className="buttonDiv">
                        <a href="..">
                            <button class="customButton" role="button">New Start Location</button>
                        </a>
                    </div>
                </div>
                <div className="destBox">
                    <h3 className="infoText">End location:<br/>
                        {end}</h3>
                    <div className="buttonDiv">
                        <a href={"../" + start}>
                            <button class="customButton" role="button">New End Location</button>
                        </a>
                    </div>
                </div>
                {/* <p><a href='..'>Choose new start location</a></p>
                <p><a href={'../' + start}>Choose new end location</a></p> */}
            </div>

            {/* <img src={process.env.PUBLIC_URL + '/images/Hall1.JPG'} className="testImg"></img> */}

            {/* const viewer = new PhotoSphereViewer.Viewer({
            plugins: [
                [PhotoSphereViewer.MapPlugin, {
                    imageUrl: 'path/to/map.jpg',
                    center: { x: 785, y: 421 },
                    rotation: '-12deg',
                }],
            ],
        }); */}

            <div id="viewer"></div>

            {photoViewerElement}
		</div>
    )
}

function getPhotoViewer(plugins, imagePath) {
    return <ReactPhotoSphereViewer src={process.env.PUBLIC_URL + imagePath}
    height={'75vh'} width={"100%"} plugins={plugins}
    ></ReactPhotoSphereViewer>
}

export default Map2D;