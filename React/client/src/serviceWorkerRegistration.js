// serviceWorker.js
const isLocalhost = Boolean(
    window.location.hostname === '192.168.0.15' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
        /^127(?:\.\d+){0,3}\.\d+$/
    )
);

const register = (config) => {
    if ('serviceWorkerRegistration' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
        return;
    }

    window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

        if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
        } else {
        registerValidSW(swUrl, config);
        }
    });
    }
};

const registerValidSW = (swUrl, config) => {
    navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
        if (registration.installing) {
    registration.installing.onstatechange = () => {
        if (registration.installing.state === 'installed') {
            if (navigator.serviceWorker.controller) {
                console.log(
                    'New content is available; please refresh.'
                );
            } else {
                console.log('Content is cached for offline use.');
            }
            }
        };
        }
    })
    .catch((error) => {
        console.error('Error during service worker registration:', error);
    });
};

  // Check if the service worker can be controlled
const checkValidServiceWorker = (swUrl, config) => {
    fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
    })
    .then((response) => {
        const contentType = response.headers.get('content-type');
        if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
        ) {
        navigator.serviceWorker.ready.then((registration) => {
            registration.unregister().then(() => {
            window.location.reload();
            });
        });
        } else {
        registerValidSW(swUrl, config);
        }
    })
    .catch(() => {
        console.log(
        'No internet connection found. App is running in offline mode.'
        );
    });
};

export { register };



