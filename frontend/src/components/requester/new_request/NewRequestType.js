import React from 'react';
import Logo from '../../global_ui/logo'
import './RequestType.css'

function RequestType() {
    return(
      <div>
        <nav className='navbar'>
          <div className='back_div'>
            <button className='btn_back'>
              <span className='i1'>
              <i className='fas fa-chevron-left'></i>
              </span>
            </button>
          </div>
          <span className='nav_head'>
              Choose Request Type
            </span>
        </nav>
        <div className='container'>
          <Logo />
          <button className='btn2'>
            <span className='i2'>
            <span className='box'>
              <i className='fas fa-plus'></i>
            </span>
            </span>
            <span className='btn2_text'>
              General Request
            </span>
          </button>
          <button className='btn2'>
            <span className='icon2'>
              <span className='i3'>
              <i className='fas fa-truck-pickup'></i>
              </span>
            </span>
            <span className='btn2_text'>
              Pick Up / Drop
            </span>
          </button>
        </div>
      </div>
    )
}
export default RequestType;


