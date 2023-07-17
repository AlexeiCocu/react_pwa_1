import React, { useEffect, useState } from 'react';

function InstallPrompt() {
    const [installPrompt, setInstallPrompt] = useState(null);

    useEffect(() => {

        console.log('useEffect')

        const handleBeforeInstallPrompt = event => {

            console.log('event', event)

            event.preventDefault();
            setInstallPrompt(event);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);


        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, [installPrompt]);

    const handleInstall = () => {
        if (installPrompt) {
            installPrompt.prompt();
            installPrompt.userChoice.then(choiceResult => {
                console.log('User choice:', choiceResult.outcome);
                setInstallPrompt(null);
            });
        }
    };

    if (!installPrompt) {
        return null;
    }

    return (
        <div>
            <p>Would you like to install this app?</p>
            <button onClick={handleInstall}>Install</button>
        </div>
    );
}

export default InstallPrompt;
