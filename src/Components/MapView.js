import React, {useCallback, useEffect, useState} from "react";
import { MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
// import {writeUserData} from "../Firebase";
// import firebase from "firebase/app";
// import "firebase/database";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});



const MapView = ({user, lat, lng}) => {


    return (
        <>
            <MapContainer
                style={{ height: '60vh', width: '100vw' }}
                center={[user.lat, user.lng]}
                zoom={20}
                scrollWheelZoom={false}
                doubleClickZoom
                tap={false}
            >
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

                    url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
                />


                <Marker position={[user.lat, user.lng]} key={user.id}>
                    <Popup>
                        <div>{user.name}</div>
                        <div>email: <a href={`email:${user.email}`}>{user.email}</a></div>
                    </Popup>
                </Marker>

            </MapContainer>
        </>

    );
};

export default MapView;
