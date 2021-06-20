import React from 'react';
import styles from './input.module.css'

/**
 * 
 * @param {*} props textAlign,size,minLength,value,placeholder,name,type,onChange,error,maxLength are the supported props
 * You can pass an error msg to show an error below input field
 * @returns a custom styled input component.
 */
const InputField = ({
    textAreaClass,rows,cols,fieldType,
    textAlign,size,minLength,value,placeholder,name,type,onChange,error,maxLength}) => {
    
    return ( 
        <div className="input-field">
            {
                fieldType=="textarea" &&
                <textarea
                rows={rows}
                cols={cols}
                 size={size} style={{textAlign:textAlign}} className={`${error?"error-field":"normal-field"} ${textAreaClass}`} type={type} name={name} value={value} minLength={minLength} maxLength={maxLength} onChange={onChange} required/>
            }
            {
                fieldType=="textarea" &&                
                <label className="label" htmlFor={name}>{placeholder}</label>
            }            
            {
                !fieldType &&
                <input 
                size={size} 
                style={{textAlign:textAlign}} 
                className={error?"error-field":"normal-field"} 
                type={type} name={name} value={value} minLength={minLength} maxLength={maxLength} onChange={onChange} required/>
            }
            {
                !fieldType &&
                <label className="label" htmlFor={name}>{placeholder}</label>
            }            
            <br />
            
            {error && <span className="error-msg" >{error}</span>}
            {error && <div style={{ height: 1 + 'rem' }} ></div>}

        </div>


     );
}
 
export default InputField;