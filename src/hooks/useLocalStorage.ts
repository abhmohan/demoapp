import { useState } from 'react';

const useLocalStorage = (key: string, defaultValue?: any) => {
    const [localStorageValue, setLocalStorageValue] = useState(() => {
        try {
            const value = localStorage.getItem(key);
            if (value) {
                return JSON.parse(value);
            }

            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;

        } catch (error) {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;
        }
    });

    const setLocalStorageStateValue = (value: any) => {
        let newValue;

        if (typeof value === 'function') {
            const fn = value;
            newValue = fn(localStorageValue);
        } else {
            newValue = value;
        }

        localStorage.setItem(key, JSON.stringify(newValue));
        setLocalStorageValue(newValue);
    };

    const removeLocalStorageStateValue = (key: string) => {
        localStorage.removeItem(key);
    };

    return [localStorageValue, setLocalStorageStateValue, removeLocalStorageStateValue];
};

export default useLocalStorage;