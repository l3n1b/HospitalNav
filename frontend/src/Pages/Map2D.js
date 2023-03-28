import React from 'react';
import { useParams } from 'react-router-dom';
import MainHeader from '../Partials/MainHeader';
// import { Viewer } from '@photo-sphere-viewer/core';
import { ReactPhotoSphereViewer, MapPlugin } from 'react-photo-sphere-viewer';
import './Map2d.css'

function Map2D() {
    let {start, end} = useParams()

    const plugins =  [
            [MapPlugin, {
                imageUrl: (process.env.PUBLIC_URL + '/maps/Floor1Map.jpg'),
                center: { x: 785, y: 421 },
                rotation: '-12deg',
            }],
        ];

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
            <div className="container">
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
            <ReactPhotoSphereViewer src={process.env.PUBLIC_URL + '/images/Hall1.JPG'}
                height={'80vh'} width={"100%"} plugins={plugins}
                ></ReactPhotoSphereViewer>
            {photoViewer()}
		</div>
    )
}

function photoViewer() {
    console.log("photo viewer")
    // const viewer = new Viewer({
    //     container: document.querySelector('#viewer'),
    //     panorama: (process.env.PUBLIC_URL + '/images/Hall1.JPG'),
    // });
}

export default Map2D;