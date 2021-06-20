import React from 'react';
<<<<<<< HEAD
import styles from './input.module.css'
=======
import inputStyles from './input.module.css'
>>>>>>> textarae

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
        <div className={inputStyles.inputfield}>
            {
                fieldType=="textarea" &&
                <textarea
                rows={rows}
                cols={cols}
                 size={size} style={{textAlign:textAlign}} className={`${error?`${inputStyles.errorfield}`:`${inputStyles.normalfield}`} ${textAreaClass}`} type={type} name={name} value={value} minLength={minLength} maxLength={maxLength} onChange={onChange} required/>
            }
            {
                fieldType=="textarea" &&                
                <label className={inputStyles.label} htmlFor={name}>{placeholder}</label>
            }            
            {
                !fieldType &&
                <input 
                size={size} 
                style={{textAlign:textAlign}} 
                className={error?`${inputStyles.errorfield}`:`${inputStyles.normalfield}`} 
                type={type} name={name} value={value} minLength={minLength} maxLength={maxLength} onChange={onChange} required/>
            }
            {
                !fieldType &&
                <label className={inputStyles.label} htmlFor={name}>{placeholder}</label>
            }            
            <br />
            
            {error && <span className={inputStyles.errormsg} >{error}</span>}
            {error && <div style={{ height: 1 + 'rem' }} ></div>}

        </div>


     );
}
 
export default InputField;