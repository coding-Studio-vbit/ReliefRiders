import { useEffect, useState } from "react";
/**
 * 
 * @param {string} key Any unqiue key
 * @param {any} initialValue 
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
    },[data])

    return [data,setData];
}
 
export const useSessionStorageState = (key,initialValue) => {

    const [data,setData] = useState(()=>{
        const value = sessionStorage.getItem(key)
        if(value)
        return JSON.parse(value)
        return initialValue
    })
    useEffect(()=>{
        sessionStorage.setItem(key,JSON.stringify(data))
    },[data])

    return [data,setData];
}
