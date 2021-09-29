import React,{useState,useEffect} from 'react';
import { requestOTP } from '../../Context/authOperations';
import Dialog from '../GlobalComponents/Overlay/overlay';
import styles from './createadmin.module.css'
import { createAdminHelper } from './createAdminHelper';
import { deleteAdminByID } from './deleteAdmin';
import { fetchAdmins } from './fetchAdmins';

const CreateAdmin = () => {
    const [adminList, setadminList] = useState([]);
    const [deleteAdminID, setDeleteAdminID] = useState(false);
    const [message, setmessage] = useState(null);
    const [phoneNumber ,setPhoneNumber] = useState(null);
    const [name,setName]= useState(null)
    const [otp,setOtp] = useState(null)


    useEffect(()=>{
      
      async function fetch(){
        const res = await fetchAdmins()
        if(!res.error){
          setadminList(res.data)
        }
      }
      fetch()

    },[])

    

    async function addAdmin() {
      const res = await createAdminHelper(phoneNumber,name,otp)
      if(res.error){
        setmessage(res.error)
        
      }else{
        setadminList((a)=>{
          let admins = [...a]
          admins.push({name:name,phoneNumber:phoneNumber})
          return admins;
        })
        setmessage("Admin Added Successfully");
      }

      setTimeout(() => {
        setmessage(null)
      }, 2500);
      
    }

    async function getOTP() {
      const res = await requestOTP(phoneNumber,2)
      if(res.error){
      setmessage(res.error)

      }
      setTimeout(() => {
        setmessage(null)
      }, 1000);
      
    }

    async function deleteAdmin(number,index) {  
      const res = await deleteAdminByID(number)
      if(!res.error){
        
        setadminList((admins)=>{
          let adms = [...admins]
          adms.splice(index,1)
          return adms
        })
      }
    }

    
    
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
                <input onChange={(e)=>setName(e.target.value)} required className={styles.inputdata} type="text" placeholder="Name"></input>
              </div>

              <div className={styles.field}>                 
                <label className={styles.label1}>Phone Number</label>                
                <input onChange={(e)=>setPhoneNumber(e.target.value)} required className={styles.inputdata} type="mobile" placeholder="Phone Number"
                ></input>
              </div> 

              <div className={styles.field}>
                <label className={styles.label1}>OTP</label>
                <div className={styles.odd}>
                  <input 
                  required 
                  onChange= {(e)=>setOtp(e.target.value)}
                  style={{width:'60%'}}                     
                  className={styles.inputdata} type="number" 
                  maxLength="6" minLength="6"
                  placeholder="OTP"></input>
                  <button 
                  variant="success" 
                  type="button" style={{width:'35%'}} 
                  className={styles.btn}
                  onClick={()=>getOTP()}
                  >Get OTP</button>
                </div>
              </div>                 
              <button variant="success" type="button" 
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
              adminList.map((admin,index)=>{
                return <div className={styles.admin}>
                          <p style={{fontWeight:'bold'}}>{admin.name}</p>
                          <p>{admin.mobile}</p>
                          <button onClick={()=>deleteAdmin(admin.phoneNumber,index)} className={styles.delete} >Delete Admin</button>

                       </div>
              })
            }
            </div>                
          </div>
      </div>
    );
}

export default CreateAdmin;


// const adminlist=[
//   {
//     adminID:'1',
//     name:'Sai Ki',
//     mobile:'9550710377',
//   },
//   {
//     adminID:'11',
//     name:'Sai Ki',
//     mobile:'8080808080',
//   },
//   {
//     adminID:'111',
//     name:'Sai Ki',
//     mobile:'9999999999',
//   },
// ]