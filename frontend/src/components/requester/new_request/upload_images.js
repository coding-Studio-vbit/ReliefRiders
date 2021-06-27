import React from 'react';
import { useState,} from 'react';
import styles from './Upload_images.module.css';
import { useSessionStorageState } from "../../../utils/useLocalStorageState";
import Navbar from '../../global_ui/nav';
import { useHistory } from 'react-router-dom';

const uploadImages =()=>{

    const [files, setFiles]= useSessionStorageState("images",[]);
    const [num, setNum] = useSessionStorageState("num",0);
    const [error, setError] = useState(null);
    const [Medicine, setMedicine] = useState(sessionStorage.getItem('Medicine')==='true'); 
    const [Grocery, setGrocery] = useState(sessionStorage.getItem('Grocery')==='true');    
    const [Misc,setMisc] = useState(sessionStorage.getItem('Misc')==='true'); 
    const [categories,setcategories] = useSessionStorageState("tags",[]);
    const history= useHistory();        

     const onInputChange = (e) =>{
       
        if(num + e.target.files.length<=3)
        {
            
            for(let i=0;i<e.target.files.length;i++){
            
            var t = e.target.files[i].type.split('/').pop().toLowerCase();
            
            if(t!= "jpeg" && t!="jpg" && t!="png")
            {
                setError("Please select a valid image file");
            }
            else{

            if(e.target.files[i].size > 10240000){
                setError("Maximum file size is 10MB");         
                
            }else{
                const reader = new FileReader();
                setNum(num => num + 1);                
                
                reader.onload = async function(){
                    
                    const base64Response = await fetch(reader.result);
                    const blob = await base64Response.blob();
                    const blobUrl = URL.createObjectURL(blob);
                    // let blob1 = await fetch(blobUrl).then(r => r.blob());
                    // console.log(blob1)
                    // console.log(blob)
                    setFiles(files=> [...files, blobUrl])
                }
                   
                 reader.readAsDataURL(e.target.files[i])
                 setError(" ");    
            }
            }
  
            }
        }
        else{
            
            setError("More than 3 files are not allowed");           
        }
       
        }   

        

    const onSubmit = (e) =>{
        e.preventDefault();
       
        if(num!=0 && (Medicine===true || Grocery===true || Misc===true))
        {
            setError(" ");
        

        if(Medicine===true)
        {
            setcategories(categories=> [...categories,"MEDICINES"]);
        }
        if(Grocery===true)
        {
            setcategories(categories=> [...categories,"GROCERIES"]);            
        }
        if(Misc===true)
        {
            setcategories(categories=> [...categories,"MISC."]);           
        }
        console.log(categories.length);
        history.push('/address');
         

        // const data = new FormData();

        // for(let i=0; i<files.length; i++){
        //     data.append('file',files[i]);
        // }

        }else{

        setError("Please upload files and select the categories");

        }
        
        }  

        const onCancel = ()=>{

        }


    return(
       
        <>
        <Navbar style={{backgroundColor:'#79CBC5',marginBottom:"10px"}} back='/' backStyle={{ color: 'white' }} 
        title="Upload Images" titleStyle={{ color: 'white' }} />       
            
            
            <div className={styles.content_up}>
                   
           
               
            <p className={styles.up_img_header}>Please choose the items you want to request</p>
             <p className={styles.up_error_msg}>{error ? error : ""}</p>

           
                          
             <label htmlFor="file" className={styles.labels}>
             <p className={styles.up_msg}>Upload Images: </p>
             <div className={styles.form_group}>
                <i className="fa fa-upload"></i>
                <p>Tap to add Image</p>
             <input type="file" id="file" name="files"
             onChange={onInputChange} 
             multiple />  
                      
            </div>
            </label>
            
 
             <div className={styles.up_img_preview}>         
             <Display previewImages={files}/>
           </div>
           


          <div className={styles.up_list}> 
               
                  <div>
                     <label className={styles.up_check_label}>Medicine
                      <input type="checkbox" name="Medicine" checked={Medicine}
                       onChange = {(e)=> {
                        sessionStorage.setItem('Medicine',`${e.target.checked}`);
                       setMedicine(e.target.checked);
                       }} />
                      <span className={`${styles.up_check} ${styles.check_1}`}></span>
                      </label>
                  </div>
                  <div> 
                     <label className={styles.up_check_label}>Grocery
                      <input type="checkbox" name="Grocery" checked={Grocery}
                      onChange = {(e)=> {
                        sessionStorage.setItem('Grocery',`${e.target.checked}`);  
                      setGrocery(e.target.checked);
                      }} />
                      <span className={`${styles.up_check} ${styles.check_2}`}></span>
                      </label>
                  </div>
                  <div> 
                      <label className={styles.up_check_label}>Misc.
                      <input type="checkbox" name="Misc" checked={Misc}
                       onChange = {(e)=> {
                        sessionStorage.setItem('Misc',`${e.target.checked}`); 
                       setMisc(e.target.checked);
                       }}/>
                      <span className={`${styles.up_check} ${styles.check_3}`}></span>
                      </label>
                  </div>
             

          </div>

          <div className={styles.buttonscontrol}>
          <button onClick={onCancel} className={styles.up_img_cancel}>Cancel </button>
           <button onClick={onSubmit} className={styles.up_img_button}>Proceed</button>          
           </div>
    
       </div>         
       
      
      </>
    );
}

export default uploadImages;

const Display = ({previewImages}) => {

    if(!previewImages){
        return null;
    }

    return previewImages.map((image, index) => <img className={styles.img_style} style={{ maxHeight:'350px'}} key={index} src={image}/>);
};
