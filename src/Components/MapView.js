import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
// import {writeUserData} from "../Firebase";
// import firebase from "firebase/app";
// import "firebase/database";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});



const MapView = ({user, lat, lng}) => {

    console.log('user in mapView', user)

    return (
        <MapContainer style={{height: '90vh', width: '100vw'}}
                      // center={[lat, lng]}
                      center={[55.9533, -3.1883]}
                      zoom={13}
                      scrollWheelZoom={false}
                      doubleClickZoom
                      tap={false}
        >
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                       url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
            />

                <Marker
                    // position={[user.lat, user.lng]}
                    position={[55.9533, -3.1883]}
                    key={user.id}
                >
                    <Popup>
                        <div>{user.name}</div>
                        <div>email: <a href={'email:' + user.email}>{user.email}</a></div>
                        {/*<div>{user.data.description}</div>*/}
                    </Popup>
                </Marker>


            {/*{!user.active ?  <Marker position={[userLocation.lat, userLocation.lng]} icon={user.active ? greenIcon : redIcon} >*/}
            {/*    <Popup>*/}
            {/*        {user.name} / {user.active ? 'Visible' : 'Not Visible'}*/}
            {/*    </Popup>*/}
            {/*</Marker> : ''}*/}


        </MapContainer>
    );
};

export default MapView;
