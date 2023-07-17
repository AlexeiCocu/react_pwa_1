import CurrentLocation from "./Components/CurrentLocation";
import InstallPrompt from "./Components/InstallPrompt";


function App() {

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


    return (
        <div>

            <CurrentLocation/>

            <InstallPrompt/>
        </div>
    );
}

export default App;
