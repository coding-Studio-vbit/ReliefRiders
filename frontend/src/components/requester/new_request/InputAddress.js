import React,{useState} from 'react';
import inputAddressStyles from './InputAddress.module.css';

function MyMapComponent() {
  const [address, setAddress] = useState('');
  //const [error, setError] = useState(null);

  const validateAddress=()=>{

  }
  return (
    <form onSubmit={validateAddress}>
      <div className={inputAddressStyles.inputContainer}>
         
          <input type="text"
            className={inputAddressStyles.addressField} 
            value={address}
            placeholder="Search Address"
            onChange={ (e)=>setAddress(e.target.value) }
            
          />
          <button
          className={inputAddressStyles.searchBtn}
           onClick={ (e)=>validateAddress(e)}>
             <i className="fas fa-search-location" style={{fontSize:'25px'}}></i>
           </button>
          
      </div>
    </form>      
    )
}

export default MyMapComponent
