import React from 'react'
import styles from './textArea.module.css'

function textArea({
    textAlign,size,minLength,value,placeholder,name,type,onChange,error,maxLength,
    rows,cols,
    width
    }) {
    return (
        <div className={styles.inputField} style={{width: width}}>
            <textarea 
            rows={rows} cols={cols}
            size={size} style={{textAlign:textAlign,paddingTop:'1em'}} className={styles.input+" "+(error?styles.errorField:styles.normalField)} type={type} name={name} value={value} minLength={minLength} maxLength={maxLength} onChange={onChange} required/>
            <label className={styles.label} htmlFor={name}>{placeholder}</label>
            <br />
            {error && <span className={styles.errorMsg} >{error}</span>}
            {error && <div style={{ height: 1 + 'rem' }} ></div>}
        </div>
    )
}

export default textArea
