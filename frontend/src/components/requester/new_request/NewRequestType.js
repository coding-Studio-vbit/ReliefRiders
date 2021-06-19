import React from 'react';
import Logo from '../../global_ui/logo'
import Requests from './RequestType.module.css'

function RequestType() {
    return(
      <div>
        <nav className={Requests.navbar}>
          <div className={Requests.back_div}>
            <button className={Requests.btn_back}>
              <span className={Requests.i1}>
              <i className='fas fa-chevron-left'></i>
              </span>
            </button>
          </div>
          <span className={Requests.nav_head}>
              Choose Request Type
            </span>
        </nav>
        <div className={Requests.container}>
          <Logo />
          <button className={Requests.btn2}>
            <span className={Requests.i2}>
            <span className={Requests.box}>
              <i className='fas fa-plus'></i>
            </span>
            </span>
            <span className={Requests.btn2_text}>
              General Request
            </span>
          </button>
          <button className={Requests.btn2}>
            <span className={Requests.icon2}>
              <span className={Requests.i3}>
              <i className='fas fa-truck-pickup'></i>
              </span>
            </span>
            <span className={Requests.btn2_text}>
              Pick Up / Drop
            </span>
          </button>
        </div>
      </div>
    )
}
export default RequestType;


