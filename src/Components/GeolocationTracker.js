import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import {db, auth} from '../Firebase'
import {onAuthStateChanged} from "firebase/auth";
import MapView from "./MapView";


const GeolocationTracker = ({user}) => {
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
        // Track geolocation when the component mounts
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);

                // Write the updated geolocation to the Firebase Realtime Database
                // const userId = 'user1'; // Replace with the authenticated user's ID
                const userRef = ref(db, `users/${userId}`);
                set(userRef, { latitude, longitude });
            },
            (error) => {
                console.error('Error getting geolocation:', error);
            }
        );

        // Clean up the geolocation watcher when the component unmounts
        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, [userId]);

    return (
        <div>
            <h2>Geolocation Tracker</h2>
            <p>Latitude qq: {latitude}</p>
            <p>Longitude yy: {longitude}</p>

            {/*{latitude && (*/}
                <MapView user={user} lat={latitude} lng={longitude}/>
            {/*)}*/}

        </div>
    );
};

export default GeolocationTracker;
