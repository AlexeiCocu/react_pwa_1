import React, {useEffect} from 'react';
import {Popup} from "react-leaflet";

const Marker = ({user, lat, lng }) => {

    useEffect(()=>{

        console.log('marker lat')

    }, [lat])

    return (
        <>
            {lat ? (
                <Marker position={[lat, lng]} key={user.id}>
                    <Popup>
                        <div>{user.name}</div>
                        <div>email: <a href={`email:${user.email}`}>{user.email}</a></div>
                    </Popup>
                </Marker>
            ) : ''}

        </>

    );
};

export default Marker;