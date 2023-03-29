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

const getData = async () => {
    const response = await fetch("../data/");
    return response
}

const Map2D = () => {
    const [fetchCall, setFetchCall] = useState();
    let {start, end} = useParams()
    const [photoViewerElement, setPhotoViewerElement] = useState();

    useEffect(() => {
        getData().then(
            result => {
                setFetchCall(result)
                let plugins = ([
                                [MapPlugin, {
                                    imageUrl: (process.env.PUBLIC_URL + '/maps/Floor1Map.jpg'),
                                    center: { x: 785, y: 421 },
                                    rotation: '-12deg',
                                }],
                            ])
                setPhotoViewerElement(photoViewer(plugins));
            });
    },[]);



    console.log(fetchCall)

    // useEffect(() => {
    //     const dataFetch = async () => {
    //         const data = await (
    //             await fetch("./data")
    //             .then(response => {
    //                 console.log(response)
    //                 setPlugins([
    //                     [MapPlugin, {
    //                         imageUrl: (process.env.PUBLIC_URL + '/maps/Floor1Map.jpg'),
    //                         center: { x: 785, y: 421 },
    //                         rotation: '-12deg',
    //                     }],
    //                 ]);

    //             })
    //             .catch(error => {
    //                 console.log(error)
    //             })
    //         )
    //     }

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
            <div className="container info">
                <h3>Start location: {start}</h3>
                <h3>End location: {end}</h3>
                <p><a href='..'>Choose new start location</a></p>
                <p><a href={'../' + start}>Choose new end location</a></p>
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

function photoViewer(plugins) {
    console.log("photo viewer")
    return <ReactPhotoSphereViewer src={process.env.PUBLIC_URL + '/images/Hall1.JPG'}
    height={'70vh'} width={"100%"} plugins={plugins}
    ></ReactPhotoSphereViewer>
}

export default Map2D;