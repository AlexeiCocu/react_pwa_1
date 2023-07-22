import React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthComponent = ({ onUserAuthenticated }) => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, and you can access their user ID (uid)
            const userId = user.uid;
            // console.log('User ID:', userId);
            // console.log('user in auth component', user)

            // Notify the parent component about the user being authenticated
            onUserAuthenticated(userId);
        } else {
            // User is signed out
            // console.log('User is signed out.');
        }
    });

    return null; // This component doesn't render anything, so it returns null
};

export default AuthComponent;
