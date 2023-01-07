import React, {useEffect, useState} from 'react';

const UseLocalStorage = <T,>(key: string, fallback: T) => {

    useEffect(()=>{
        const item = localStorage.getItem(key);
    },[])

    const [value,SetValue] = useState(fallback);

    useEffect(()=>{
        const item = localStorage.getItem(key);
        if (item) {SetValue(JSON.parse(item))}
    },[])

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value));
    },[value]);

    return [value,SetValue] as const;
};

export default UseLocalStorage;