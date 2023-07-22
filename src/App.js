import CurrentLocation from "./Components/CurrentLocation";
import InstallPrompt from "./Components/InstallPrompt";
import { signInWithPopup } from "firebase/auth";
import {auth, handleWriteData, providerFacebook, providerGoogle, writeUserData} from "./Firebase";
import {useCallback, useEffect, useState} from "react";
import LocationButton from "./Components/LocationButton";
import MapView from "./Components/MapView";
import AuthComponent from "./Firebase/AuthComponent";
import GeolocationTracker from "./Components/GeolocationTracker";
import { getDatabase, ref, onValue } from 'firebase/database';
import {db} from './Firebase'


function App() {
    const [authenticatedUserId, setAuthenticatedUserId] = useState(null);
    const [user, setUser] = useState({});


    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')

    const [data, setData] = useState(null);




    // if ('serviceWorker' in navigator) {
    //     window.addEventListener('load', () => {
    //         navigator.serviceWorker.register('/service-worker.js')
    //             .then(registration => {
    //                 console.log('Service Worker registered:', registration);
    //             })
    //             .catch(error => {
    //                 console.error('Service Worker registration failed:', error);
    //             });
    //     });
    // }

    const handleFacebookLogin = () => {
        signInWithPopup(auth, providerFacebook).then((result) => {

            console.log('facebooks', result)

            setUser(result.user);
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleGoogleLogin = () => {
        signInWithPopup(auth, providerGoogle).then((result) => {

            // console.log('result user ->', result)

            const name = result.user.displayName;
            const email = result.user.email;
            const profilePic = result.user.photoURL;

            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("profilePic", profilePic);

            setUser({
                userId: result.user.uid,
                name: result.user.displayName,
                email: result.user.email,
                profilePic: result.user.photoURL,
            });

            // getPosition()

        }).catch((error) => {
            alert(error)
        })

    }

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('profilePic');
    }

    const handleUserAuthenticated = (userId) => {
        setAuthenticatedUserId(userId);
    };


    // const getPosition = useCallback(() => {
    //
    //     navigator.geolocation.getCurrentPosition(position => {
    //         const { latitude, longitude } = position.coords;
    //
    //         setLat(latitude);
    //         setLng(longitude);
    //
    //         setUser(prevState => {
    //             return {
    //                 ...prevState,
    //                 lat: latitude,
    //                 lng: longitude
    //             }
    //         });
    //
    //     }, );
    //
    // }, [])
    // useEffect(() => {
    //     if(localStorage.getItem('name')){
    //         setUser({
    //             name: localStorage.getItem('name'),
    //             email: localStorage.getItem('email'),
    //         });
    //     }
    //
    //     getPosition();
    //
    //
    //     // console.log('user in useeffect',user)
    //
    //
    // }, [getPosition]);


    // const getData = useCallback(() => {
    //     // Set up a listener to read data from the Firebase Realtime Database
    //     const dataRef = ref(db, 'users/SFHgeTjjiRWP6TCsYCk91LjomrI3');
    //
    //     const onDataChange = (snapshot) => {
    //         // The snapshot contains the data at the specified path
    //         const data = snapshot.val();
    //         setData(data);
    //     };
    //
    //     // Attach the listener
    //     onValue(dataRef, onDataChange);
    //
    //     console.log('data', data)
    //
    //
    //     //Clean up the listener when the component unmounts
    //     return () => {
    //         // Detach the listener to avoid memory leaks
    //         const dataRef = ref(db, 'data');
    //         onValue(dataRef, null);
    //     };
    //
    // }, [])


    // useEffect(() => {
    //     getData()
    //
    // }, [getData]);


    return (
        <div>

            {/*============Auth component =======*/}
            <div>
                {/*<h1>My App</h1>*/}
                {/*{user ? (*/}
                {/*    <div>*/}
                {/*        <p>User is authenticated. UserId: {authenticatedUserId}</p>*/}
                {/*        /!* Display your authenticated app content here *!/*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <p>User is not authenticated.</p>*/}
                {/*    /* Optionally, you can show a login/signup component here */}
                {/*)}*/}

                <AuthComponent onUserAuthenticated={handleUserAuthenticated} />
            </div>
            {/*============end auth component ==========*/}

            {user ? (
                <div>
                    <button onClick={handleLogout}>Logout</button>
                    <h3>Welcome {localStorage.getItem('name')}</h3>
                    {/*<p>{localStorage.getItem('email')}</p>*/}
                    {/*<div>*/}
                    {/*    <img src={localStorage.getItem('profilePic')} alt="dp"/>*/}
                    {/*</div>*/}


                    {/*<CurrentLocation/>*/}

                    {/*<InstallPrompt/>*/}

                    {/*<LocationButton/>*/}

                    {/*<button onClick={handleWriteData}>Write to DB</button>*/}

                    {/*{user.lng && (*/}
                    {/*    <MapView user={user} lat={lat} lng={lng}/>*/}
                    {/*)}*/}


                    {/*{user.lng && (*/}
                    {/*    <GeolocationTracker user={user}  />*/}
                    {/*)}*/}

                    <GeolocationTracker user={user} setUser={setUser}  />
                </div>

            ) : (
                <div>
                    <button onClick={handleFacebookLogin}>Sign In with Facebook</button>
                    <button onClick={handleGoogleLogin}>Sign In with Google</button>
                </div>

            )}



        </div>
    );
}

export default App;
