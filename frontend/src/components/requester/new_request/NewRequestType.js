import React from 'react';
import Logo from '../../global_ui/logo'
import RequestTypeCSS from './RequestType.module.css'

function RequestType() {
    return(
      <div>
        <nav className={RequestTypeCSS.navbar}>
          <div className={RequestTypeCSS.back_div}>
            <button className={RequestTypeCSS.btn_back}>
              <span className={RequestTypeCSS.i1}>
              <i className='fas fa-chevron-left'></i>
              </span>
            </button>
          </div>
          <span className={RequestTypeCSS.navHead}>
              Choose Request Type
            </span>
        </nav>
        <div className={RequestTypeCSS.container}>
          <Logo />
          <button className={RequestTypeCSS.btn2}>
            <span className={RequestTypeCSS.i2}>
            <span className={RequestTypeCSS.box}>
              <i className='fas fa-plus'></i>
            </span>
            </span>
            <span className={RequestTypeCSS.btn2Text}>
              General Request
            </span>
          </button>
          <button className={RequestTypeCSS.btn2}>
            <span className={RequestTypeCSS.icon2}>
              <span className={RequestTypeCSS.i3}>
              <i className='fas fa-truck-pickup'></i>
              </span>
            </span>
            <span className={RequestTypeCSS.btn2Text}>
              Pick Up / Drop
            </span>
          </button>
        </div>
      </div>
    )
}
export default RequestType;


