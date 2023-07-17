import React, {useEffect, useState} from 'react';

const CurrentLocation = () => {
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            console.log('Latitude', latitude)


            setLat(latitude);
            setLng(longitude)


        });
    }, [lat]);



    return (
        <div>
            <p>Latitude: {lat}</p>
            <p>Longitude: {lng}</p>
        </div>
    );
};

export default CurrentLocation;