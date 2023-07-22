import React, { useEffect, useState } from 'react';
import { ref, set } from 'firebase/database';
import {db, auth} from '../Firebase'
import {onAuthStateChanged} from "firebase/auth";
import MapView from "./MapView";


const GeolocationTracker = ({user, setUser}) => {

    // console.log(user)

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [userId, setUserId] = useState(null);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserId(user.uid)

        } else {
            // User is signed out
            console.log('User is signed out.');
        }
    });


    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);

                const userFB = {
                    ...user,
                    lat: latitude,
                    lng: longitude
                }

                setUser(userFB)

                const userRef = ref(db, `users/${userId}`);
                set(userRef, userFB);
            },
            (error) => {
                console.error('Error getting geolocation:', error);
            }
        );

        // Clean up the geolocation watcher when the component unmounts
        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, [userId, latitude, user, setUser]);

    return (
        <div>
            {/*<h2>Geolocation Tracker</h2>*/}
            {/*<p>Latitude ee: {latitude}</p>*/}
            {/*<p>Longitude: {longitude}</p>*/}

            {latitude && (
                <MapView user={user} lat={latitude} lng={longitude}/>
            )}

        </div>
    );
};

export default GeolocationTracker;
