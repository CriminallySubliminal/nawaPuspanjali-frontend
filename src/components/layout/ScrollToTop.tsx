import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component scrolls the window to the top whenever the location changes.
 * This is used to ensure that navigating to a new page starts at the top of the scroll.
 */
export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth' // Using 'instant' to avoid flashing or smooth scroll delays on navigation
        });
    }, [pathname]);

    return null;
}
