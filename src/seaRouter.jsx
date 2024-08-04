/** @jsx h */
import { h } from './framework';
import { useState, useEffect } from './framework';

function createSeaRouter(routes, options = {}) {
    const { basePath = '' } = options;

    // Function to get the current path
    const getCurrentPath = () => {
        const path = window.location.pathname.replace(basePath, '');
        return path === '' ? '/' : path;
    };

    // Router component
    function SeaRouter() {
        const [currentPath, setCurrentPath] = useState(getCurrentPath());

        // Effect to listen for URL changes
        useEffect(() => {
            const onLocationChange = () => setCurrentPath(getCurrentPath());
            window.addEventListener('popstate', onLocationChange);
            return () => window.removeEventListener('popstate', onLocationChange);
        }, []);

        // Render the appropriate component based on the current path
        const RouteComponent = routes[currentPath] || routes['/404'] || (() => <div>404 Not Found</div>);
        return <RouteComponent />;
    }

    // Navigation function
    SeaRouter.navigate = (path) => {
        window.history.pushState({}, '', basePath + path);
        const event = new Event('popstate');
        window.dispatchEvent(event);
    };

    // Link component
    SeaRouter.Link = ({ to, children }) => (
        <a href={basePath + to} onClick={(e) => {
            e.preventDefault();
            SeaRouter.navigate(to);
        }}>
            {children}
        </a>
    );

    return SeaRouter;
}

export { createSeaRouter };

