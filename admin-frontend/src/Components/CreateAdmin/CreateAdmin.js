import React,{useState,useEffect} from 'react';
import Dialog from '../GlobalComponents/Overlay/overlay';
import styles from './createadmin.module.css'

const CreateAdmin = () => {
    const [adminList, setadminList] = useState(adminlist);
    const [deleteAdminID, setDeleteAdminID] = useState(false);
    const [message, setmessage] = useState(null);

    function getAdminList() {
      setadminList(adminlist)     
      // make http request and delete dummy data
    }

    function addAdmin() {
      //add http request
      setmessage("Admin Added Successfully");

      setTimeout(() => {
        setmessage(null)
      }, 2500);
      
    }

    function verifyOTP() {
      //verify OTP
      setmessage("OTP Verified Successfully")
      setTimeout(() => {
        setmessage(null)
      }, 1000);
      
    }

    function deleteAdmin() {  
      console.log('====================================');
      console.log(deleteAdminID);
      console.log('====================================');
      //http request
      setDeleteAdminID(null);
    }

    useEffect(() => {
      getAdminList();
      
    },[adminList])
    
    return (
      <div> 
          {
            deleteAdminID &&
            <Dialog display="block" message={`Are you sure, do you want to delete admin with ID ${deleteAdminID} ?`} operation={()=>deleteAdmin()} closeOverlay={()=>setDeleteAdminID(null)} />
          }
          <div className={styles.signupcontent}>              
            <p className={styles.title}>Create New Admin</p>                     
            <form className={styles.adminform}>                                
              <div className={styles.field}>
                <label className={styles.label1}>Full Name</label>
                <input required className={styles.inputdata} type="text" placeholder="Name"></input>
              </div>

              <div className={styles.field}>                 
                <label className={styles.label1}>Phone Number</label>                
                <input required className={styles.inputdata} type="mobile" placeholder="Phone Number"
                ></input>
              </div> 

              <div className={styles.field}>
                <label className={styles.label1}>OTP</label>
                <div className={styles.odd}>
                  <input 
                  required 
                  style={{width:'60%'}}                     
                  className={styles.inputdata} type="number" 
                  maxLength="6" minLength="6"
                  placeholder="OTP"></input>
                  <button 
                  variant="success" 
                  type="button" style={{width:'35%'}} 
                  className={styles.btn}
                  onClick={()=>verifyOTP()}
                  >Get OTP</button>
                </div>
              </div>                 
              <button variant="success" type="submit" 
              className={styles.submitBtn}
              onClick={()=>addAdmin()}
              >Add Admin</button>
            </form> 
            { message &&
              <p style={{
              color:'green',
              marginTop:'7px'
              }}>{message}</p>  
            }                 
          </div>
          
          <div className={styles.signupcontent}>            
            <p className={styles.title}>Admin List</p>             
            <div className={styles.adminform}>
            {
              adminList.map((admin)=>{
                return <div className={styles.admin}>
                          <p style={{fontWeight:'bold'}}>{admin.name}</p>
                          <p>{admin.mobile}</p>
                          <button onClick={()=>setDeleteAdminID(admin.adminID)} className={styles.delete} >Delete Admin</button>

                       </div>
              })
            }
            </div>                
          </div>
      </div>
    );
}

export default CreateAdmin;


const adminlist=[
  {
    adminID:'1',
    name:'Sai Ki',
    mobile:'9550710377',
  },
  {
    adminID:'11',
    name:'Sai Ki',
    mobile:'8080808080',
  },
  {
    adminID:'111',
    name:'Sai Ki',
    mobile:'9999999999',
  },
]