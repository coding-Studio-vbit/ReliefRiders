import React from 'react';
import styles from './input.module.css'

/**
 * 
 * @param {*} props textAlign,size,minLength,value,placeholder,name,type,onChange,error,maxLength are the supported props
 * You can pass an error msg to show an error below input field
 * @returns a custom styled input component.
 */
const InputField = ({ukey,textAlign,size,minLength,value,placeholder,name,type,onChange,error,maxLength}) => {
    
    return ( 

        <div  key={ukey} className={styles.inputField}>
            <input id={name} size={size} style={{textAlign:textAlign}} className={styles.input+" "+(error?styles.errorField:styles.normalField)} type={type} name={name} value={value} minLength={minLength} maxLength={maxLength} onChange={onChange} required/>
            <label className={styles.label} htmlFor={name}>{placeholder}</label>
            <br />
            {error && <span className={styles.errorMsg} >{error}</span>}
            {error && <div style={{ height: 1 + 'rem' }} ></div>}
        </div>
     );
}
 
export default InputField;