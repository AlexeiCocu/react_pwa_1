import CurrentLocation from "./Components/CurrentLocation";
import InstallPrompt from "./Components/InstallPrompt";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import {auth, providerFacebook, providerGoogle} from "./Firebase";
import {useState} from "react";


function App() {
    const [user, setUser] = useState(null);

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
        });
    }

    const handleFacebookLogin = () => {
        signInWithPopup(auth, providerFacebook).then((result) => {

            console.log(result)

            setUser(result.user);
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleGoogleLogin = () => {
        signInWithPopup(auth, providerGoogle).then((result) => {

            console.log(result)

            const name = result.user.displayName;
            const email = result.user.email;
            const profilePic = result.user.photoURL;

            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("profilePic", profilePic);

            setUser(name)

        }).catch((error) => {
            alert(error)
        })

    }

    const handleLogout = () => {
        setUser(null);
    }


    return (
        <div>

            {user ? (

                <div>

                    <button onClick={handleLogout}>Logout</button>
                    <h3>Welcome {localStorage.getItem('name')}</h3>
                    <p>{localStorage.getItem('email')}</p>
                    <div>
                        <img src={localStorage.getItem('profilePic')} alt="dp"/>
                    </div>


                    <CurrentLocation/>

                    <InstallPrompt/>

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
