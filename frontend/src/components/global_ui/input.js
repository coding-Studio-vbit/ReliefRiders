import React from 'react';
import './input.css'


/**
 * 
 * @param {*} props value,placeholder,name,type,onChange,error,maxLength are the supported props
 * You can pass an error msg to show an error below input field
 * @returns a custom styled input component.
 */
const InputField = ({value,placeholder,name,type,onChange,error,maxLength}) => {

    return ( 

        <div className="input-field">
            <input className={error?"error-field":"normal-field"} type={type} name={name} value={value} maxLength={maxLength} onChange={onChange} required/>
            <label className="label" htmlFor={name}>{placeholder}</label>
            {error && <span>{error}</span>}
        </div>


     );
}
 
export default InputField;