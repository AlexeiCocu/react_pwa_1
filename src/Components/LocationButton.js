import React, { useState } from "react";

const LocationButton = () => {
    const [showButton, setShowButton] = useState(true);
    const [locationError, setLocationError] = useState(null);

    const handleGetLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log("Latitude:", latitude);
                    console.log("Longitude:", longitude);
                    setShowButton(false); // Hide the button after getting the location
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        setShowButton(true); // Show the "Activate Location" button
                        setLocationError("Location access denied. Please allow access to use this feature.");
                    } else {
                        setLocationError("Error getting location: " + error.message);
                    }
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    const handleActivateLocation = () => {
        setLocationError(null); // Clear any previous error message
        setShowButton(false); // Hide the "Activate Location" button
        handleGetLocation(); // Trigger the location access request
    };

    return (
        <div>
            {showButton && (
                <button onClick={handleActivateLocation}>
                    Activate Location
                </button>
            )}
            {locationError && <p>{locationError}</p>}
        </div>
    );
};

export default LocationButton;
