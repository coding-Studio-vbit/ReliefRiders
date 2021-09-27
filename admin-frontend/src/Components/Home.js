import React from 'react'
import { useHistory } from 'react-router'
import styles from './home.module.css' 

function AdminHome() {
    let history = useHistory();
    
    return (
        <div className={styles.home}>
            <p className={styles.homeTitle}>Welcome Admin</p>
            <button className={styles.loginBtn} onClick={()=>history.push('/login')}>LOGIN</button>            
       </div>
    )
}

export default AdminHome
