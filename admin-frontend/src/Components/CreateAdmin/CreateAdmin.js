import React,{useState,useEffect} from 'react';
import Dialog from '../GlobalComponents/Overlay/overlay';
import styles from './createadmin.module.css'

const CreateAdmin = () => {
    const [adminList, setadminList] = useState();
    // const [showDialog, setshowDialog] = useState();

    function getAdminList() {
      setadminList(adminlist)     
      // make http request and delete dummy data
    }

    function deleteAdmin(id) {
      console.log('====================================');
      console.log(id);
      console.log('====================================');
      //make a http request to delete admin      
    }

    useEffect(() => {
      getAdminList();
      
    },[adminList])
    return (
      <div> 
          <Dialog display="block" message="he" />       
          <div className={styles.signupcontent}>              
            <p className={styles.title}>Create New Admin</p>                     
            <form className={styles.adminform}>                                
              <div className={styles.field}>
                <label className={styles.label1}>Full Name</label>
                <input required className={styles.inputdata} type="text" placeholder="Name"></input>
              </div>

              <div className={styles.field}>                 
                <label className={styles.label1}>Phone Number</label>                
                <input required className={styles.inputdata} type="number" placeholder="Phone Number"></input>
              </div> 

              <div className={styles.field}>
                <label className={styles.label1}>OTP</label>
                <div className={styles.odd}>
                  <input 
                  required 
                  style={{width:'60%'}}                     
                  className={styles.inputdata} type="number" 
                  placeholder="OTP"></input>
                  <button variant="success" type="submit" style={{width:'35%'}} className={styles.btn}>Get OTP</button>
                </div>
              </div>                 
              <button variant="success" type="submit" className={styles.submitBtn}>Add Admin</button>
            </form>                                 
          </div>
          
          <div className={styles.signupcontent}>            
            <p className={styles.title}>Admin List</p>             
            <div className={styles.adminform}>
            {
              adminList.map((admin)=>{
                return <div className={styles.admin}>
                          <p style={{fontWeight:'bold'}}>{admin.name}</p>
                          <p>{admin.mobile}</p>
                          <button onClick={()=>deleteAdmin(admin.adminID)} className={styles.delete} >Delete Admin</button>

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