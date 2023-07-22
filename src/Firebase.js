import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";


const firebaseConfig = {
    databaseURL: 'https://react-pwa-8a460-default-rtdb.europe-west1.firebasedatabase.app',
    apiKey: "AIzaSyBCpqWl6r0PTTMyd_-fUzIwITqodZzsxy0",
    authDomain: "react-pwa-8a460.firebaseapp.com",
    projectId: "react-pwa-8a460",
    storageBucket: "react-pwa-8a460.appspot.com",
    messagingSenderId: "388512712149",
    appId: "1:388512712149:web:af1edcff653ae629de695c"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


const auth = getAuth(app);
const providerFacebook = new FacebookAuthProvider();
const providerGoogle = new GoogleAuthProvider();

const AuthComponent = ({ db }) => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userId = user.uid;

            // Data to be written to the database
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
                age: 30
            };

            // Create a new path under 'users' with the user ID as the key
            const userRef = ref(db, 'users/' + userId);

            // Write the user data to the specified path
            set(userRef, userData)
                .then(() => {
                    console.log('Data written successfully.');
                })
                .catch((error) => {
                    console.error('Error writing data:', error);
                });
        } else {
            console.log('User is signed out.');
        }
    });
};



const writeUserData = async (user) => {

    try {
        const reference = ref(db, 'users/' + user.id);

        await set(reference, {
            userName: user.name,
            email: user.email,
            profile_picture: user.imageUrl,
            latitude: user.latitude,
            longitude: user.longitude
        });

        console.log('Data written successfully.');
    } catch (error) {
        console.error('Error writing data:', error);
    }
};


const handleWriteData = (userData) => {
    const userId = generateUniqueId();

    const dataRef = ref(db, 'users/' + userId);

    set(dataRef, userData)
        .then(() => {
            console.log('Data written successfully.');
        })
        .catch((error) => {
            console.error('Error writing data:', error);
        });
};




const readUserData = (userId, updateLatitude, postElement) => {
    const latitudeRef = ref(db, 'users/' + userId + '/latitude');
    onValue(latitudeRef, (snapshot ) => {
        const data = snapshot.val();
        updateLatitude(postElement, data)
    });
}



const generateUniqueId = () => {
    // Generate a unique ID using your preferred method (e.g., UUID, timestamp, etc.)
    // For demonstration purposes, we'll use a simple timestamp-based ID
    return Date.now().toString();
};



export {auth, providerFacebook, providerGoogle, writeUserData, readUserData, handleWriteData, db};