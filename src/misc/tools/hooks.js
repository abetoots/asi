import { useState, useEffect, useRef } from 'react';

//init cache for our scripts
const scriptsCache = new Set();
export function useScript(src) {
    // Keeping track of script loaded and error state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [done, setDone] = useState(false);

    useEffect(
        () => {
            // If scriptsCache array already includes src that means another instance ...
            // ... of this hook already loaded this script, so no need to load again.
            if (scriptsCache.has(src)) {
                console.log('cache has src');
                setLoading(false);
                setDone(true);
                setError(false);
            } else {
                console.log('cache doesnt have src');
                scriptsCache.add(src);
            }

            console.log(scriptsCache);

            // Create script
            let script = document.createElement('script');
            script.src = src;
            script.async = true;

            // Script event listener callbacks for load and error
            const onScriptLoad = () => {
                console.log('loaded');
                setLoading(false);
                setDone(true);
                setError(false);
            };

            const onScriptError = () => {
                // Remove from scriptsCache we can try loading again
                scriptsCache.delete(src);
                script.remove();
                setLoading(false);
                setDone(true);
                setError(true);
            };

            script.addEventListener('load', onScriptLoad);
            script.addEventListener('error', onScriptError);

            // Add script to document body
            document.body.appendChild(script);

            // Remove event listeners on cleanup
            return () => {
                script.removeEventListener('load', onScriptLoad);
                script.removeEventListener('error', onScriptError);
            };

        },
        [src] // Only re-run effect if script src changes
    );

    return [loading, done, error];
}

export function useClassOnce(c) {
    //https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
    const ref = useRef(null);
    // ✅ Class instance is created lazily once
    if (ref.current === null) {
        ref.current = new c();
    }
    return ref.current;
}

// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
export function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set debouncedValue to value (passed in) after the specified delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        //Cleanup
        // ...Effects run for every render and not just once. 
        //...This is why React also cleans up effects from the previous render before running the effects next time.
        // Sample context: if the value passed in changes, the previous timeout is cleared, then set again
        return () => {
            clearTimeout(handler);
        }

    },
        // Only re-call effect if value changes
        [value]
    );

    return debouncedValue;
}