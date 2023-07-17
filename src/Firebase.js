import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBCpqWl6r0PTTMyd_-fUzIwITqodZzsxy0",
    authDomain: "react-pwa-8a460.firebaseapp.com",
    projectId: "react-pwa-8a460",
    storageBucket: "react-pwa-8a460.appspot.com",
    messagingSenderId: "388512712149",
    appId: "1:388512712149:web:af1edcff653ae629de695c"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const providerFacebook = new FacebookAuthProvider();
const providerGoogle = new GoogleAuthProvider();

export {auth, providerFacebook, providerGoogle};