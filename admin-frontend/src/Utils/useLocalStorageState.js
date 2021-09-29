import { useEffect, useState } from "react";
/**
 * 
 * @param {string} key Any unqiue key
 * @param {any} initialValue 
 * 
 *  * Data will be stored in local storage.

    usage 
    
    const [data,setData] = useLocalStorageState("data","")
 */
export const useLocalStorageState = (key,initialValue) => {

    const [data,setData] = useState(()=>{
        const value = localStorage.getItem(key)
        if(value)
        return JSON.parse(value)
        return initialValue
    })
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(data))
    },[key,data])

    return [data,setData];
}
/**
 * 
 * @param {string} key Any unqiue key
 * @param {any} initialValue 
 * 
 * Data will be deleted when browser or app is closed. Best for storing temporary session data.
 * 
    usage 
    
    const [data,setData] = useSessionStorageState("data","")
 */
export const useSessionStorageState = (key,initialValue) => {

    const [data,setData] = useState(()=>{
        const value = sessionStorage.getItem(key)
        if(value)
        return JSON.parse(value)
        return initialValue
    })
    useEffect(()=>{
        sessionStorage.setItem(key,JSON.stringify(data))
    },[key,data])

    return [data,setData];
}
